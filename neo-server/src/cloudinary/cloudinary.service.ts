import { Injectable, Inject } from '@nestjs/common'
import { v2 as cloudinary } from 'cloudinary'
import type {
	UploadApiOptions,
	UploadApiResponse,
	UploadApiErrorResponse
} from 'cloudinary'

@Injectable()
export class CloudinaryService {
	constructor(
		@Inject('CLOUDINARY')
		private readonly cloudinaryClient: typeof cloudinary
	) {}

	async uploadImage(
		file: Express.Multer.File,
		folder?: string
	): Promise<string> {
		return new Promise((resolve, reject) => {
			if (!this.cloudinaryClient.uploader) {
				throw new Error('Cloudinary uploader not initialized')
			}

			const uploadOptions: UploadApiOptions = {
				resource_type: 'auto',
				folder: folder || 'default_folder'
			}

			const stream = this.cloudinaryClient.uploader.upload_stream(
				uploadOptions,
				(
					error: UploadApiErrorResponse | undefined,
					result: UploadApiResponse | undefined
				) => {
					if (error) {
						reject(error)
						return
					}
					if (!result?.secure_url) {
						reject(new Error('No URL returned from Cloudinary'))
						return
					}
					resolve(result.secure_url)
				}
			)

			stream.end(file.buffer)
		})
	}

	async uploadImages(
		files: Express.Multer.File[],
		folder?: string
	): Promise<string[]> {
		return Promise.all(files.map(file => this.uploadImage(file, folder)))
	}
}
