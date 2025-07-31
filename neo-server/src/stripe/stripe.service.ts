import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { OrderService } from '../order/order.service'
import Stripe from 'stripe'
import { OrderStatus } from '@prisma/client'

@Injectable()
export class StripeService {
	private stripe: Stripe

	constructor(
		private configService: ConfigService,
		private orderService: OrderService
	) {
		this.stripe = new Stripe(
			this.configService.get<string>('SECRET_KEY_STRIPE')!
		)
	}

	constructEvent(payload: Buffer, signature: string): Stripe.Event {
		const webhookSecret = this.configService.get<string>('WEBHOOK_SECRET')
		if (!webhookSecret) throw new Error('Webhook secret not found')
	
		return this.stripe.webhooks.constructEvent(payload, signature, webhookSecret)
	}
	

	async createPayment(orderId: string, total: number) {
		const session = await this.stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: [
				{
					price_data: {
						currency: 'usd',
						product_data: {
							name: 'NeoShop Order'
						},
						unit_amount: total * 100
					},
					quantity: 1
				}
			],
			mode: 'payment',
			success_url: `${this.configService.get<string>('CLIENT_URL')}/thanks`,
			cancel_url: `${this.configService.get<string>('CLIENT_URL')}/orders/${orderId}/cancel`,
			metadata: {
				orderId
			}
		})

		return { id: session.id, url: session.url }
	}

	async handleWebhook(event: Stripe.Event) {
		console.log('=== STRIPE WEBHOOK RECEIVED ===');
		console.log(`Event type: ${event.type}`);
		console.log(`Event ID: ${event.id}`);
		console.log('Event data:', JSON.stringify(event.data, null, 2));
	  
		try {
		  switch (event.type) {
			case 'checkout.session.completed':
			  console.log('Processing checkout.session.completed event...');
			  const session = event.data.object as Stripe.Checkout.Session;
			  console.log('Session ID:', session.id);
			  console.log('Payment status:', session.payment_status);
			  console.log('Metadata:', session.metadata);
	  
			  const orderId = session.metadata?.orderId;
			  if (!orderId) {
				console.error('❌ Order ID not found in session metadata');
				break;
			  }
	  
			  console.log(`Updating order ${orderId} to COMPLETED status`);
			  await this.orderService.updateOrderStatus(orderId, 'COMPLETED' as OrderStatus);
			  await this.orderService.addPaymentData(orderId, session.id, session);
			  console.log(`✅ Order ${orderId} successfully updated`);
			  break;
	  
			case 'checkout.session.expired':
			  console.log('Processing checkout.session.expired event...');
			  const expiredSession = event.data.object as Stripe.Checkout.Session;
			  console.log('Expired session ID:', expiredSession.id);
			  console.log('Metadata:', expiredSession.metadata);
	  
			  const expiredOrderId = expiredSession.metadata?.orderId;
			  if (!expiredOrderId) {
				console.error('❌ Order ID not found in expired session metadata');
				break;
			  }
	  
			  console.log(`Updating order ${expiredOrderId} to CANCELLED status`);
			  await this.orderService.updateOrderStatus(expiredOrderId, 'CANCELLED' as OrderStatus);
			  console.log(`✅ Order ${expiredOrderId} marked as expired`);
			  break;
	  
			default:
			  console.log(`⚠️ Unhandled event type: ${event.type}`);
		  }
		} catch (error) {
		  console.error('‼️ Error processing webhook event:', error);
		  throw error; // Перебрасываем ошибку для обработки на верхнем уровне
		}
	  
		console.log('=== WEBHOOK PROCESSING COMPLETE ===');
	  }

}
