import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class RegisterDto {
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
  @Exclude()
  role: string;

  @ApiProperty()
  @Exclude()
  skill: string[];

  @ApiProperty()
  @Exclude()
  certification: string[];
}
