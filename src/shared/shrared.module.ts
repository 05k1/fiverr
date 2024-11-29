import { Module } from '@nestjs/common';
import { CloudUploadService } from './cloudUpload.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  providers: [CloudUploadService],
  exports: [CloudUploadService],
})
export class SharedMudole {}
