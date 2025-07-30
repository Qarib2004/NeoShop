import { forwardRef, Module } from '@nestjs/common'
import { StripeService } from './stripe.service'
import { StripeController } from './stripe.controller'
import { ConfigModule } from '@nestjs/config'
import { OrderModule } from 'src/order/order.module'

@Module({
	imports: [ConfigModule, forwardRef(() => OrderModule)],
	controllers: [StripeController],
	providers: [StripeService],
	exports: [StripeService]
})
export class StripeModule {}
