import { Inject, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse } from 'cloudinary';

@Injectable()
export class CloudUploadService {
  constructor(@Inject('CLOUDINARY') private cloudinary) {}

  async uploadImage(
    file: Express.Multer.File,
    folder: string,
  ): Promise<UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = this.cloudinary.uploader.upload_stream(
        {
          folder,
        },
        (error: any, result: UploadApiErrorResponse) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );
      uploadStream.end(file.buffer);
    });
  }
}
