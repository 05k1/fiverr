import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLoaiCongViecDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  job_category_name: string;
}
