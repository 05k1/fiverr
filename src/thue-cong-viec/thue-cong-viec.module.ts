import { Module } from '@nestjs/common';
import { ThueCongViecService } from './thue-cong-viec.service';
import { ThueCongViecController } from './thue-cong-viec.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CongViecService } from 'src/cong-viec/cong-viec.service';

@Module({
  controllers: [ThueCongViecController],
  providers: [ThueCongViecService, PrismaService, CongViecService],
})
export class ThueCongViecModule {}
