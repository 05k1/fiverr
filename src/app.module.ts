import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { BinhLuanModule } from './binh-luan/binh-luan.module';
import { ChiTietLoaiCongViecModule } from './chi-tiet-loai-cong-viec/chi-tiet-loai-cong-viec.module';
import { UserModule } from './user/user.module';
import { CongViecModule } from './cong-viec/cong-viec.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LoaiCongViecModule } from './loai-cong-viec/loai-cong-viec.module';
import { ThueCongViecModule } from './thue-cong-viec/thue-cong-viec.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    CongViecModule,
    JwtModule.register({}),
    LoaiCongViecModule,
    ThueCongViecModule,
    BinhLuanModule,
    ChiTietLoaiCongViecModule,
    CloudinaryModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
