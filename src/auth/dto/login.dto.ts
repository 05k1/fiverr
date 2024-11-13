import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @Expose()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  password: string;
}
