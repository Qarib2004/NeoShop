import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CreateOrderDto } from './dto/create-order.dto'
// import { Order } from './order.entity'
import { OrderStatus,Order } from '@prisma/client';


@Injectable()
export class OrderService {
	constructor(private prisma: PrismaService) {}

	async createOrder(userId: string, data: CreateOrderDto): Promise<Order> {
		// Для каждого item получаем продукт из БД, чтобы узнать актуальную цену
		const itemsWithPrices = await Promise.all(
		  data.items.map(async (item) => {
			const product = await this.prisma.product.findUnique({
			  where: { id: item.productId },
			});
			if (!product) {
			  throw new Error(`Product with id ${item.productId} not found`);
			}
			return {
			  productId: item.productId,
			  quantity: item.quantity,
			  price: product.price, // используем цену из базы, а не из dto
			};
		  }),
		);
	  
		// Считаем total по реальным ценам
		const total = itemsWithPrices.reduce(
		  (sum, item) => sum + item.price * item.quantity,
		  0,
		);
	  
		return this.prisma.order.create({
		  data: {
			total,
			userId,
			status: OrderStatus.PENDING,
			customerName: data.customerName,
			customerEmail: data.customerEmail,
			customerPhone: data.customerPhone,
			shippingAddress: data.shippingAddress,
			items: {
			  create: itemsWithPrices,
			},
		  },
		  include: { items: true },
		});
	  }
	  

	async updateOrderStatus(
		orderId: string,
		status: OrderStatus
	): Promise<Order> {
		return this.prisma.order.update({
			where: { id: orderId },
			data: { status }
		})
	}

	async addPaymentData(
		orderId: string,
		paymentId: string,
		paymentData: any
	): Promise<Order> {
		return this.prisma.order.update({
			where: { id: orderId },
			data: { paymentId, paymentData }
		})
	}

	async getOrderById(
		orderId: string,
		includePayment = false
	  ): Promise<Order | null> {
		const order = await this.prisma.order.findUnique({
		  where: { id: orderId },
		  include: {
			items: {
			  include: {
				product: true
			  }
			}
		  }
		});
	  
		if (!order) return null;
	  
		if (!includePayment) {
		  const { paymentData, ...rest } = order as any;
		  return rest as Order;
		}
	  
		return order;
	  }
	  

	async getUserOrders(userId: string): Promise<Order[]> {
		return this.prisma.order.findMany({
			where: { userId },
			include: {
				items: {
					include: {
						product: true
					}
				}
			},
			orderBy: { createdAt: 'desc' }
		})
	}
}
