import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateChiTietLoaiCongViecDto {
  @ApiProperty()
  @Expose()
  id: number;
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsString()
  detail_name: string;
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsString()
  image: string;
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  job_category_id: number;
}
