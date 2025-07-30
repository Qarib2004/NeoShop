import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator'

export class ReviewDto {
	@IsString({
		message: 'Need to string'
	})
	@IsNotEmpty({ message: 'required text' })
	text: string

	@IsNumber({}, { message: 'Rating need be a number' })
	@Min(1, { message: 'minimal rating 1' })
	@Max(5, { message: 'Max rating 5' })
	@IsNotEmpty({ message: 'Rating a  required' })
	rating: number
}
