import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { BinhLuanModule } from './binh-luan/binh-luan.module';
import { ChiTietLoaiCongViecModule } from './chi-tiet-loai-cong-viec/chi-tiet-loai-cong-viec.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    BinhLuanModule,
    ChiTietLoaiCongViecModule,
    UserModule,
  ],
})
export class AppModule {}
