import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}
  async register(body: RegisterDto): Promise<UserDto> {
    try {
      const { name, email, password, phone, birth_day, gender } = body;
      const existUser = await this.prismaService.users.findUnique({
        where: { email },
      });
      if (existUser) {
        throw new HttpException(
          { message: 'email da ton tai' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = await this.prismaService.users.create({
        data: {
          name,
          email,
          password: hashPassword,
          phone,
          birth_day: new Date(birth_day),
          gender,
        },
      });
      const res: UserDto = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      };
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async login(body: LoginDto): Promise<string> {
    const { email, password } = body;
    const checkEmail = await this.prismaService.users.findUnique({
      where: { email },
    });
    if (!checkEmail) {
      throw new HttpException(
        { message: 'email khong ton tai' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const checkPass = await bcrypt.compare(password, checkEmail.password);
    if (!checkPass) {
      throw new HttpException(
        { message: 'password sai' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const token = this.jwtService.sign(
      { data: { userId: checkEmail.id } },
      {
        expiresIn: '30m',
        secret: this.configService.get<string>('SECRET_KEY'),
      },
    );
    return token;
  }
}
