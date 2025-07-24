import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Order } from 'generated/prisma';
import { PayPalService } from '../paypal/paypal.service';
import { RequestWithUser } from 'src/auth/interface/request-with-user';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly paypalService: PayPalService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Req() req: RequestWithUser,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.orderService.createOrder(req.user.id, createOrderDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserOrders(@Req() req: RequestWithUser) {
    return this.orderService.getUserOrders(req.user.id);
  }

  @Get(':id')
@UseGuards(JwtAuthGuard)
async getOrder(@Param('id') id: string, @Req() req: RequestWithUser) {
  const order = await this.orderService.getOrderById(id, true); 
  if (order && order.userId === req.user.id) {
    return order;
  }
  throw new NotFoundException('Order not found');
}

@Post(':id/paypal/create')
@UseGuards(JwtAuthGuard)
async createPayPalPayment(@Param('id') id: string, @Req() req: RequestWithUser) {
  const order = await this.orderService.getOrderById(id, true); // Добавлен второй параметр
  
  if (!order || order.userId !== req.user.id) {
    throw new NotFoundException('Order not found');
  }

  if (order.status !== 'PENDING') {
    throw new BadRequestException('Order already processed');
  }

  return this.paypalService.createPayment(order.id, order.total);
}

@Post(':id/paypal/capture')
@UseGuards(JwtAuthGuard)
async capturePayPalPayment(@Param('id') id: string, @Req() req: RequestWithUser) {
  const order = await this.orderService.getOrderById(id, true); // Добавлен второй параметр
  
  if (!order || order.userId !== req.user.id) {
    throw new NotFoundException('Order not found');
  }

  if (!order.paymentId) {
    throw new BadRequestException('No payment associated with this order');
  }

  return this.paypalService.capturePayment(order.paymentId);
}
}