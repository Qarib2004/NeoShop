import { Controller, Post, Query, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

// file.controller.ts
@Controller('files')
export class FileController {
    constructor(private readonly cloudinaryService: CloudinaryService) {}

    @Post('multiple')
    @UseInterceptors(FilesInterceptor('files',10)) // Must match 'files' from formData.append()
    async uploadMultiple(
        @UploadedFiles() files: Express.Multer.File[],
        @Query('folder') folder?: string
    ) {
        const urls = await this.cloudinaryService.uploadImages(files, folder)
        return { urls }
    }

    @Post('single')
    @UseInterceptors(FileInterceptor('file')) // For single file upload
    async uploadSingle(
        @UploadedFile() file: Express.Multer.File,
        @Query('folder') folder?: string
    ) {
        const url = await this.cloudinaryService.uploadImage(file, folder)
        return { url }
    }
}