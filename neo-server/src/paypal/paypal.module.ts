import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PayPalService } from './paypal.service';
import { OrderModule } from '../order/order.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [ConfigModule, forwardRef(() => OrderModule)],
  providers: [PayPalService,PrismaService],
  exports: [PayPalService],
})
export class PayPalModule {}