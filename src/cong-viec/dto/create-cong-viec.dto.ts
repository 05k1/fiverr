import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCongViecDto {
  @ApiProperty()
  @IsNotEmpty()
  job_name: string;

  @ApiProperty()
  @IsNotEmpty()
  rating: number;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  creator_id: number;

  @ApiProperty()
  image: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  job_category_detail_id: number;

  @ApiProperty()
  short_description: string;

  @ApiProperty()
  @IsNotEmpty()
  job_star: number;
}
