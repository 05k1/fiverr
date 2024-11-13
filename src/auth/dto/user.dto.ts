import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @Expose()
  @IsNotEmpty()
  id: number;
  @Expose()
  @IsNotEmpty()
  name: string;
  @Expose()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
