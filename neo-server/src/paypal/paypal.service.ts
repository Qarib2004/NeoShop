import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { OrderService } from '../order/order.service'
import * as checkoutNodeJssdk from '@paypal/checkout-server-sdk'
import { OrderStatus } from '@prisma/client'

@Injectable()
export class PayPalService {
	private client: checkoutNodeJssdk.core.PayPalHttpClient

	constructor(
		private configService: ConfigService,
		private orderService: OrderService
	) {
		const environment = new checkoutNodeJssdk.core.SandboxEnvironment(
			this.configService.get('PAYPAL_CLIENT_ID'),
			this.configService.get('PAYPAL_CLIENT_SECRET')
		)

		this.client = new checkoutNodeJssdk.core.PayPalHttpClient(environment)
	}

	async createPayment(orderId: string, total: number) {
		const request = new checkoutNodeJssdk.orders.OrdersCreateRequest()
		request.requestBody({
			intent: 'CAPTURE',
			purchase_units: [
				{
					amount: {
						currency_code: 'USD',
						value: total.toString()
					},
					reference_id: orderId
				}
			],
			application_context: {
				return_url: `${this.configService.get('CLIENT_URL')}/orders/${orderId}/success`,
				cancel_url: `${this.configService.get('CLIENT_URL')}/orders/${orderId}/cancel`
			}
		})

		const response = await this.client.execute(request)
		return response.result
	}

	async capturePayment(paypalOrderId: string) {
		const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(
			paypalOrderId
		)
		request.requestBody({})

		try {
			const response = await this.client.execute(request)
			const capture = response.result

			await this.orderService.updateOrderStatus(
				capture.purchase_units[0].reference_id,
				'COMPLETED' as OrderStatus
			)
			await this.orderService.addPaymentData(
				capture.purchase_units[0].reference_id,
				capture.id,
				capture
			)

			return capture
		} catch (error) {
			console.error('PayPal capture error:', error)
			throw error
		}
	}
}
