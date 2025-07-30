import { User } from '@prisma/client'
import { OrderStatus } from './order-status.enum'

export class Order {
	id: string
	createdAt: Date
	updatedAt: Date
	status: OrderStatus
	total: number
	userId: string
	user?: User
	paymentId?: string
	paymentData?: any

	customerName: string
	customerEmail: string
	customerPhone: string
	shippingAddress: string

	items?: OrderItem[]
}

export class OrderItem {
	id: string
	name: string
	price: number
	quantity: number
	orderId: string
	productId: string
}
