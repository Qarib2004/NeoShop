import { IsOptional, IsString } from "class-validator";

export class PaymentStatusDto {
    @IsString()
    orderId: string;
  
    @IsString()
    paypalOrderId: string;
  
    @IsString()
    status: string;
  
    @IsOptional()
    @IsString()
    paypalPaymentId?: string;
  }