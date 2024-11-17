import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CongViecModule } from './cong-viec/cong-viec.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LoaiCongViecModule } from './loai-cong-viec/loai-cong-viec.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    CongViecModule,
    JwtModule.register({}),
    LoaiCongViecModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
