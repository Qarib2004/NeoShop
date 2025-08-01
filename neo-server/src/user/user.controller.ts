import { Controller, Get, Param, Patch } from '@nestjs/common'
import { UserService } from './user.service'
import { CurrentUser } from './decorators/user.decorator'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Auth()
	@Get('profile')
	async getProfile(@CurrentUser('id') id: string) {
		return this.userService.getById(id)
	}

	@Auth()
	@Patch('profile/favorites/:productId')
	async toggleFavorites(
		@CurrentUser('id') userId: string,
		@Param('productId') prdoductId: string
	) {
		return this.userService.toogleFavorites(prdoductId, userId)
	}
}
