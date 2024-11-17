import { Module } from '@nestjs/common';
import { LoaiCongViecService } from './loai-cong-viec.service';
import { LoaiCongViecController } from './loai-cong-viec.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LoaiCongViecController],
  providers: [LoaiCongViecService, PrismaService],
})
export class LoaiCongViecModule {}
