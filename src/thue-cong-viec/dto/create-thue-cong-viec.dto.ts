import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateThueCongViecDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  job_id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  renter_id: number;

  rental_date: Date;

  completed: boolean;
}
