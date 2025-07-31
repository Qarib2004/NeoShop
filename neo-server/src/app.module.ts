import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { ColorModule } from './color/color.module'
import { CategoryModule } from './category/category.module'
import { FileModule } from './file/file.module'
import { StoreModule } from './store/store.module'
import { OrderModule } from './order/order.module'
import { StatisticsModule } from './statistics/statistics.module'
import { ProductModule } from './product/product.module'
import { PayPalModule } from './paypal/paypal.module'
import { CloudinaryModule } from './cloudinary/cloudinary.module'
import { StripeModule } from './stripe/stripe.module'
import { ReviewModule } from './review/review.module'
import * as express from 'express';
import { StripeWebhookMiddleware } from './stripe/stripe.middleware'
import { RawBodyMiddleware } from './common/raw-body.middleware'

@Module({
	imports: [
		ConfigModule.forRoot(),
		AuthModule,
		UserModule,
		ColorModule,
		CategoryModule,
		FileModule,
		StoreModule,
		OrderModule,
		StatisticsModule,
		ProductModule,
		PayPalModule,
		CloudinaryModule,
		StripeModule,
		ReviewModule
	]
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
	  consumer
		.apply(RawBodyMiddleware)
		.forRoutes({ path: 'orders/webhook', method: RequestMethod.POST });
	}
  }