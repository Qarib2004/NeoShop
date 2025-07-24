import { IsString } from 'class-validator'

export class CategoryDto {
	@IsString({
		message: 'title required'
	})
	title: string

	@IsString({
		message: 'descriptuon required'
	})
	description: string
}
