import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'
import * as express from 'express';

async function bootstrap() {
	dotenv.config()
	const app = await NestFactory.create(AppModule)


	app.use(
		'/orders/webhook',
		express.raw({ type: 'application/json' })
	  )

	app.use(cookieParser())

	app.enableCors({
		origin: process.env.CLIENT_URL || 'http://localhost:3000',
		credentials: true,
		exposedHeaders: 'set-cookie'
	})

	const port = process.env.PORT || 5000
	await app.listen(port)

	console.log(`App listening on port ${port}`)
}
bootstrap()
