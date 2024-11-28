import { Module } from '@nestjs/common';
import { BinhLuanService } from './binh-luan.service';
import { BinhLuanController } from './binh-luan.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from 'src/strategy/jwt.strategy';

@Module({
  controllers: [BinhLuanController],
  providers: [BinhLuanService, PrismaService, JwtStrategy],
})
export class BinhLuanModule {}
