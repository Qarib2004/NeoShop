import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class AuthDto {
	@IsOptional()
	@IsString()
	name: string

	@IsString({
		message: 'Email is required'
	})
	@IsEmail()
	email: string

	@MinLength(6, {
		message: 'Password contain min 6 symbols'
	})
	@IsString({
		message: 'Password required'
	})
	password: string
}
