import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export interface RequestWithRawBody extends Request {
  rawBody: Buffer;
}

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  use(req: RequestWithRawBody, res: Response, next: NextFunction): void {
    if (req.originalUrl?.includes('/webhook')) {
      let data = '';
      req.setEncoding('utf8');
      
      req.on('data', (chunk: string) => {
        data += chunk;
      });
      
      req.on('end', () => {
        req.rawBody = Buffer.from(data, 'utf8');
        next();
      });
    } else {
      next();
    }
  }
}