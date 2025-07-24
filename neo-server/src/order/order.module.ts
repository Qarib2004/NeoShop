import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from '../prisma.service';
import { ProductModule } from '../product/product.module';
import { ConfigModule } from '@nestjs/config';
import { PayPalModule } from 'src/paypal/paypal.module';

@Module({
  imports: [ProductModule, ConfigModule,PayPalModule],
  controllers: [OrderController],
  providers: [OrderService, PrismaService],
  exports: [OrderService],
})
export class OrderModule {}