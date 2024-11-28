import { Module } from '@nestjs/common';
import { ChiTietLoaiCongViecService } from './chi-tiet-loai-cong-viec.service';
import { ChiTietLoaiCongViecController } from './chi-tiet-loai-cong-viec.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from 'src/strategy/jwt.strategy';

@Module({
  controllers: [ChiTietLoaiCongViecController],
  providers: [ChiTietLoaiCongViecService, PrismaService, JwtStrategy],
})
export class ChiTietLoaiCongViecModule {}
