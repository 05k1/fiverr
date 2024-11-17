import { Module } from '@nestjs/common';
import { CongViecService } from './cong-viec.service';
import { CongViecController } from './cong-viec.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from 'src/strategy/jwt.strategy';

@Module({
  controllers: [CongViecController],
  providers: [CongViecService, PrismaService, JwtStrategy],
})
export class CongViecModule {}
