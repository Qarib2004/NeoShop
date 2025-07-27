import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, ParseArrayPipe, Post, Put, Query, UploadedFiles, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common'
import { ProductService } from './product.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { ValidatePromise } from 'class-validator'
import { CreateProductDto, ProductDto } from './dto/product.dto'
import { ApiConsumes, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express'
import { imageFileFilter } from 'src/utils/image-file-filter'
import { CurrentUser } from 'src/user/decorators/user.decorator'

@Controller('products')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post()
	@ApiConsumes('multipart/form-data')
	@ApiBody({
	  description: 'Create new product with images',
	  type: CreateProductDto,
	})
	@ApiResponse({ status: 201, description: 'Product successfully created' })
	@ApiResponse({ status: 400, description: 'Bad request' })
	@UseInterceptors(
	  FilesInterceptor('images', 10, {
		fileFilter: imageFileFilter,
		limits: {
		  fileSize: 1024 * 1024 * 5, 
		},
	  })
	)
	async createFile(
	  @UploadedFiles() images: Express.Multer.File[],
	  @Body(new ParseArrayPipe({ items: CreateProductDto }))
	  createProductDto: CreateProductDto,
	) {
	  if (!images || images.length === 0) {
		throw new BadRequestException('At least one image is required');
	  }
  
	  try {
		return await this.productService.createWithImages({
		  ...createProductDto,
		  images,
		});
	  } catch (error) {
		throw new BadRequestException(error.message);
	  }
	}

	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.productService.getAll(searchTerm)
	}

	@Auth()
	@Get('by-storeId/:storeId')
	async getByStoreId(@Param('storeId') storeId: string) {
		return this.productService.getByStoreId(storeId)
	}

	@Get('by-id/:id')
	async getById(@Param('id') id: string) {
		return this.productService.getById(id)
	}

	@Get('by-category/:categoryId')
	async getByCategory(@Param('categoryId') categoryId: string) {
		return this.productService.getByCategory(categoryId)
	}

	@Get('most-popular')
	async getMostPopular() {
		return this.productService.getMostPopular()
	}

	@Get('similar/:id')
	async getMostSimilar(@Param('id') id:string) {
		return this.productService.getMostPopular()
	}


	@Auth()
	@Post(':storeId')
	async create(
	  @Param('storeId') storeId: string,
	  @Body() dto: ProductDto,
	  @CurrentUser('id') userId: string,  
	) {
		console.log('userId:', userId)
	  return this.productService.create(storeId, dto, userId)
	}
	

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(':id')
  async update(@Param('id') id:string, @Body() dto:ProductDto){
    return this.productService.create(id,dto)
  }


  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Delete(':id')
  async delete(@Param('id') id:string){
    return this.productService.delete(id)
  }




}
