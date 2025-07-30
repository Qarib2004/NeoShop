import {
	IsString,
	IsOptional,
	IsInt,
	IsArray,
	IsUUID,
	Min,
	MaxLength,
	IsNotEmpty,
	IsNumber,
	ArrayMinSize
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateProductDto {
	@ApiProperty()
	@IsString()
	title: string

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	description?: string

	@ApiProperty()
	@IsNumber()
	price: number

	@ApiProperty()
	@IsString()
	storeId: string

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	categoryId?: string

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	colorId?: string

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	userId?: string
}

export class ProductDto {
	@IsString()
	@MaxLength(255)
	@IsNotEmpty()
	title: string

	@IsString()
	@IsNotEmpty()
	description?: string

	@IsNumber({}, { message: 'Price is number' })
	@Min(0)
	price: number

	@IsString({ message: 'min one image', each: true })
	@ArrayMinSize(1, { message: 'min 1 image' })
	@IsNotEmpty({ each: true })
	images?: string[]

	@IsString({ message: 'category required' })
	@IsNotEmpty()
	categoryId?: string

	@IsString({ message: 'color required' })
	@IsNotEmpty()
	colorId?: string
}
