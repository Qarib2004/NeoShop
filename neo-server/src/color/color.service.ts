import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ColorDto } from './dto/color.dto'

@Injectable()
export class ColorService {
	constructor(private prisma: PrismaService) {}

	async getByStoreId(storeId: string) {
		return this.prisma.color.findMany({
			where: {
				storeId
			}
		})
	}

	async getById(id: string) {
		const color = await this.prisma.color.findUnique({
			where: {
				id
			}
		})

		if (!color) {
			throw new NotFoundException('Color not found')
		}
		return color
	}

	async create(storeId: string, dto: ColorDto) {
		return this.prisma.color.create({
			data: {
				name: dto.name,
				value: dto.value,
				storeId
			}
		})
	}

	async updateColor(storeId: string, colorId: string, dto: ColorDto) {
		return this.prisma.store.update({
			where: { id: storeId },
			data: {
				colors: {
					update: {
						where: { id: colorId },
						data: {
							name: dto.name,
							value: dto.value
						}
					}
				}
			}
		})
	}

	async delete(id: string) {
		await this.getById(id)
		return this.prisma.color.delete({
			where: {
				id
			}
		})
	}
}
