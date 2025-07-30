import {
	Controller,
	Post,
	Query,
	UploadedFile,
	UploadedFiles,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { CloudinaryService } from '../cloudinary/cloudinary.service'

@Controller('files')
export class FileController {
	constructor(private readonly cloudinaryService: CloudinaryService) {}

	@Post('multiple')
	@UseInterceptors(FilesInterceptor('files', 10))
	async uploadMultiple(
		@UploadedFiles() files: Express.Multer.File[],
		@Query('folder') folder?: string
	) {
		const urls = await this.cloudinaryService.uploadImages(files, folder)
		return { urls }
	}

	@Post('single')
	@UseInterceptors(FileInterceptor('file'))
	async uploadSingle(
		@UploadedFile() file: Express.Multer.File,
		@Query('folder') folder?: string
	) {
		const url = await this.cloudinaryService.uploadImage(file, folder)
		return { url }
	}
}
