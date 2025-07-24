import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsNumber()
  total?: number;

  @IsString()
  customerName: string;

  @IsString()
  customerEmail: string;

  @IsString()
  customerPhone: string;

  @IsString()
  shippingAddress: string;

  userId?: string;
  paymentId?: string;
  paymentData?: any;
}
