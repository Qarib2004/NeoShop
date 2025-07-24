import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OrderService } from '../order/order.service';
import Stripe from 'stripe';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private orderService: OrderService,
  ) {
    this.stripe = new Stripe(this.configService.get<string>('SECRET_KEY_STRIPE')!);
  }

  async createPayment(orderId: string, total: number) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'NeoShop Order',
            },
            unit_amount: total * 100, // Stripe принимает сумму в центах
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${this.configService.get<string>('CLIENT_URL')}/orders/${orderId}/success`,
      cancel_url: `${this.configService.get<string>('CLIENT_URL')}/orders/${orderId}/cancel`,
      metadata: {
        orderId,
      },
    });

    return { id: session.id, url: session.url };
  }

  async handleWebhook(event: Stripe.Event) {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;

      if (orderId) {
        await this.orderService.updateOrderStatus(orderId, 'COMPLETED' as OrderStatus);
        await this.orderService.addPaymentData(orderId, session.id, session);
      }
    }
  }
}
