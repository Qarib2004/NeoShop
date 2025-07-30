import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { hash } from 'argon2'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'

@Injectable()
export class UserService {
	constructor(
		private readonly prisma: PrismaService,
		private cloudinaryService: CloudinaryService
	) {}

	async updateUserAvatar(userId: string, file: Express.Multer.File) {
		const imageUrl = await this.cloudinaryService.uploadImage(file)

		return this.prisma.user.update({
			where: { id: userId },
			data: { picture: imageUrl }
		})
	}

	async getById(id: string | { id: string }) {
		const userId = typeof id === 'object' ? id.id : id

		if (!userId) {
			throw new BadRequestException('User ID is required')
		}

		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			include: {
				stores: true,
				favorites: {
					include: {
						category: true
					}
				},
				orders: true
			}
		})

		if (!user) {
			throw new NotFoundException('User not found')
		}

		return user
	}

	async getByEmail(email: string) {
		const user = await this.prisma.user.findUnique({
			where: { email },
			include: { stores: true, favorites: true, orders: true }
		})
		return user
	}

	async toogleFavorites(productId: string, userId: string) {
		const user = await this.getById(userId)
		if (!user) {
			throw new NotFoundException('User not found')
		}
		const isExist = user.favorites.some(product => product.id === productId)

		await this.prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				favorites: {
					[isExist ? 'disconnect' : 'connect']: { id: productId }
				}
			}
		})

		return true
	}

	async create(dto: AuthDto) {
		return this.prisma.user.create({
			data: {
				name: dto.name,
				email: dto.email,
				password: await hash(dto.password)
			}
		})
	}
}
