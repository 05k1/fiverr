import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBinhLuanDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  job_id: number;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  commenter_id: number;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  comment_date: Date;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  comment_star: number;
}
