import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateStoreDto } from './dto/create-store.dto'
import { UpdateStoreDto } from './dto/update-store.dto'

@Injectable()
export class StoreService {
	constructor(private prsimaService: PrismaService) {}

	async getById(storeId: string, userId: string) {
		const store = await this.prsimaService.store.findUnique({
			where: {
				id: storeId,
				userId
			}
		})

		if (!store) {
			throw new NotFoundException('Store not found or you mainface store')
		}

		return store
	}

	async create(dto: CreateStoreDto, userId: string) {
		return this.prsimaService.store.create({
			data: {
				title: dto.title,
				description: dto.description ?? null,
				userId
			}
		})
	}

	async update(storeId: string, userId: string, dto: UpdateStoreDto) {
		await this.getById(storeId, userId)
		return this.prsimaService.store.update({
			where: { id: storeId },
			data: {
				...dto,
				userId
			}
		})
	}

	async delete(userId: string, storeId: string) {
		await this.getById(storeId, userId)

		return this.prsimaService.store.delete({
			where: { id: storeId }
		})
	}
}
