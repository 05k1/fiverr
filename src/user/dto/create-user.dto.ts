import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @Expose()
  @IsString()
  phone: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  birth_day: Date;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  gender: string;

  @ApiProperty()
  @Expose()
  role: string;

  @ApiProperty()
  @Expose()
  skill: string[];

  @ApiProperty()
  @Expose()
  certification: string[];
}
