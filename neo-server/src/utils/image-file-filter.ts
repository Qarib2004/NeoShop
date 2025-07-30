import { Request } from 'express'
import { FileFilterCallback } from 'multer' // ✅ Правильно

export const imageFileFilter = (
	req: Request,
	file: Express.Multer.File,
	callback: FileFilterCallback
) => {
	if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
		callback(new Error('Only image files are allowed!') as any, false)
		return
	}
	callback(null, true)
}
