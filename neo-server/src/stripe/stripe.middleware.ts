// src/stripe/stripe.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';

@Injectable()
export class StripeWebhookMiddleware implements NestMiddleware {
  private rawMiddleware = bodyParser.raw({
    type: 'application/json',
    limit: '2mb'
  });

  use(req: Request, res: Response, next: () => void) {
    if (req.originalUrl === '/orders/webhook') {
      this.rawMiddleware(req, res, (error) => {
        if (error) {
          console.error('Raw body parser error:', error);
          return res.status(400).send('Invalid request body');
        }
        next();
      });
    } else {
      next();
    }
  }
}