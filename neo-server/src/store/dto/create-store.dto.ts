import { IsString, IsOptional } from "class-validator";

export class CreateStoreDto {
  @IsString({ message: 'Title required' })
  title: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string; 
}
