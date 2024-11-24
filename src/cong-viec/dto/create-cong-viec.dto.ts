import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCongViecDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  job_name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  creator_id: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  job_category_detail_id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  short_description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  job_star: number;
}
