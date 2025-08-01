import { Injectable, NotFoundException } from '@nestjs/common'
import { contains } from 'class-validator'
import { PrismaService } from 'src/prisma.service'
import { ProductDto } from './dto/product.dto'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'

@Injectable()
export class ProductService {
	constructor(
		private prisma: PrismaService,
		private cloudinaryService: CloudinaryService
	) {}

	async getAll(searchTerm?: string) {
		if (searchTerm) return this.getSearchTermFilter(searchTerm)

		return await this.prisma.product.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				category: true
			}
		})
	}

	private async getSearchTermFilter(searchTerm: string) {
		return this.prisma.product.findMany({
			where: {
				OR: [
					{
						title: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					},
					{
						description: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					}
				]
			},
			include: {
				category: true
			}
		})
	}

	async getByStoreId(storeId: string) {
		return this.prisma.product.findMany({
			where: {
				storeId
			},
			include: {
				category: true,
				color: true
			}
		})
	}

	async getById(id: string) {
		const product = await this.prisma.product.findUnique({
			where: {
				id
			},
			include: {
				category: true,
				color: true,
				reviews: {
					include: {
						user: true
					}
				}
			}
		})

		if (!product) {
			throw new NotFoundException('product not found')
		}
		return product
	}

	async getByCategory(categoryId: string) {
		const product = await this.prisma.product.findMany({
			where: {
				category: {
					id: categoryId
				}
			},
			include: {
				category: true
			}
		})

		if (!product) {
			throw new NotFoundException('product not found')
		}
		return product
	}

	async getMostPopular() {
		try {
			const mostPopularProducts = await this.prisma.orderItem.groupBy({
				by: ['productId'],
				_count: { id: true },
				orderBy: { _count: { id: 'desc' } },
				take: 6
			})


			if (
				mostPopularProducts.length === 0 ||
				mostPopularProducts.every(item => !item.productId)
			) {
				return this.getFallbackProducts()
			}

			const productIds = mostPopularProducts
				.map(item => item.productId)
				.filter((id): id is string => !!id)


			if (productIds.length === 0) {
				return this.getFallbackProducts()
			}

			const products = await this.prisma.product.findMany({
				where: { id: { in: productIds } },
				include: { category: true }
			})

			return products
		} catch (error) {
			return this.getFallbackProducts()
		}
	}

	private async getFallbackProducts() {
		return this.prisma.product.findMany({
			take: 6,
			orderBy: { createdAt: 'desc' },
			include: { category: true }
		})
	}

	async getSimilar(id: string) {
		const currentProduct = await this.getById(id)
		if (!currentProduct.category) {
			throw new NotFoundException('Product category not found')
		}

		const products = await this.prisma.product.findMany({
			where: {
				category: {
					title: currentProduct.category.title
				},
				NOT: {
					id: currentProduct.id
				}
			},
			include: { category: true },
			orderBy: { createdAt: 'asc' }
		})
		return products
	}

	async create(storeId: string, dto: ProductDto, userId?: string) {
		return this.prisma.product.create({
			data: {
				title: dto.title,
				description: dto.description,
				price: dto.price,
				images: dto.images,
				categoryId: dto.categoryId,
				colorId: dto.colorId,
				storeId,
				userId
			}
		})
	}

	async update(id: string, dto: ProductDto) {
		await this.getById(id)
		return this.prisma.product.update({
			where: { id },
			data: dto
		})
	}

	async delete(id: string) {
		await this.getById(id)
		return this.prisma.product.delete({
			where: {
				id
			}
		})
	}

	async createWithImages(data: {
		title: string
		description?: string
		price: number
		images: Express.Multer.File[]
		storeId: string
		categoryId?: string
		colorId?: string
		userId?: string
	}) {
		const imageUrls = await this.cloudinaryService.uploadImages(data.images)

		return this.prisma.product.create({
			data: {
				title: data.title,
				description: data.description,
				price: data.price,
				images: imageUrls,
				storeId: data.storeId,
				categoryId: data.categoryId,
				colorId: data.colorId,
				userId: data.userId
			}
		})
	}
}
