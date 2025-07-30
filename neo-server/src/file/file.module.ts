import { Module } from '@nestjs/common'
import { FileService } from './file.service'
import { FileController } from './file.controller'
import { CloudinaryModule } from '../cloudinary/cloudinary.module'
import { CloudinaryService } from '../cloudinary/cloudinary.service'
import { MulterModule } from '@nestjs/platform-express'
import { PrismaService } from 'src/prisma.service'

@Module({
	imports: [
		CloudinaryModule,
		MulterModule.register({
			dest: './uploads'
		})
	],
	controllers: [FileController],
	providers: [FileService, CloudinaryService, PrismaService]
})
export class FileModule {}
