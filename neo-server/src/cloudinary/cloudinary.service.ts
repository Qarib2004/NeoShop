import { Injectable, Inject } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { Express } from 'express';
import { ConfigType } from '@nestjs/config'; 

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject('CLOUDINARY') private readonly cloudinaryClient: typeof cloudinary, 
  ) {}

  async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = this.cloudinaryClient.uploader.upload_stream(
        { resource_type: 'auto' },
        (error: UploadApiErrorResponse, result: UploadApiResponse) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        }
      );
      uploadStream.end(file.buffer);
    });
  }

  async uploadImages(files: Express.Multer.File[]): Promise<string[]> {
    return Promise.all(files.map(file => this.uploadImage(file)));
  }

  async deleteImage(publicId: string): Promise<void> {
    await this.cloudinaryClient.uploader.destroy(publicId);
  }
}
