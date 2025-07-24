import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	UseGuards,
	Req,
	NotFoundException,
	BadRequestException
} from '@nestjs/common'
import { OrderService } from './order.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { Order } from 'generated/prisma'
import { RequestWithUser } from 'src/auth/interface/request-with-user'
import { StripeService } from 'src/stripe/stripe.service'

@Controller('orders')
export class OrderController {
	constructor(
		private readonly orderService: OrderService,
		private readonly stripeService: StripeService
	) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	async create(
		@Req() req: RequestWithUser,
		@Body() createOrderDto: CreateOrderDto
	) {
		return this.orderService.createOrder(req.user.id, createOrderDto)
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	async getUserOrders(@Req() req: RequestWithUser) {
		return this.orderService.getUserOrders(req.user.id)
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	async getOrder(@Param('id') id: string, @Req() req: RequestWithUser) {
		const order = await this.orderService.getOrderById(id, true)
		if (order && order.userId === req.user.id) {
			return order
		}
		throw new NotFoundException('Order not found')
	}

	@Post(':id/stripe/create')
	@UseGuards(JwtAuthGuard)
	async createStripePayment(
		@Param('id') id: string,
		@Req() req: RequestWithUser
	) {
		const order = await this.orderService.getOrderById(id, true)

		if (!order || order.userId !== req.user.id) {
			throw new NotFoundException('Order not found')
		}

		if (order.status !== 'PENDING') {
			throw new BadRequestException('Order already processed')
		}

		return this.stripeService.createPayment(order.id, order.total)
	}

	
}
