import { Module } from '@nestjs/common';
import { CongViecService } from './cong-viec.service';
import { CongViecController } from './cong-viec.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { CloudinaryProvider } from 'src/cloudinary/cloudinary.provider';
import { CloudUploadService } from 'src/shared/cloudUpload.service';

@Module({
  controllers: [CongViecController],
  providers: [
    CongViecService,
    PrismaService,
    JwtStrategy,
    CloudinaryProvider,
    CloudUploadService,
  ],
})
export class CongViecModule {}
