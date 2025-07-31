import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { raw, json } from 'express';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  // ВАЖНО: Порядок middleware имеет значение!
  // Raw body parser ТОЛЬКО для Stripe webhook'ов
  app.use('/orders/webhook', raw({ 
    type: 'application/json',
    limit: '1mb'
  }));
  
  // JSON parser для всех остальных маршрутов
  app.use(json({ limit: '1mb' }));
  
  app.use(cookieParser());
  
  app.enableCors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
    exposedHeaders: 'set-cookie',
  });

  await app.listen(process.env.PORT || 5000);
  console.log(`✅ App listening on port ${process.env.PORT || 5000}`);
}
bootstrap();
