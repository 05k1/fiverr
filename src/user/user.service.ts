import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UploadApiErrorResponse } from 'cloudinary';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  private safeParse(value: string): any {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }

  async create(body: CreateUserDto): Promise<UserDto> {
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
      return {
        ...newUser,
        skill: JSON.parse(newUser.skill),
        certification: JSON.parse(newUser.certification),
      };
    } catch (error) {
      throw new HttpException(
        { message: 'Không thể tạo người dùng', detail: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<UserDto[]> {
    try {
      const data = await this.prismaService.users.findMany();
      const result = data.map((item) => ({
        ...item,
        skill: this.safeParse(item.skill),
        certification: this.safeParse(item.certification),
      }));
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.prismaService.users.findUnique({
        where: {
          id,
        },
      });
      if (!data) {
        throw new NotFoundException('user khong ton tai');
      }
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, body: UpdateUserDto) {
    try {
      const existUser = await this.prismaService.users.findUnique({
        where: { id },
      });
      if (!existUser) {
        throw new NotFoundException('user khong ton tai');
      }
      const {
        name,
        email,
        password,
        phone,
        birth_day,
        gender,
        role,
        skill,
        certification,
      } = body;

      const result = await this.prismaService.users.update({
        where: { id },
        data: {
          name,
          email,
          password,
          phone,
          birth_day: new Date(birth_day),
          gender,
          role,
          skill: JSON.stringify(skill),
          certification: JSON.stringify(certification),
        },
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByQuery(
    pageIndex: number,
    pageSize: number,
    keyword: string,
  ): Promise<UserDto[]> {
    try {
      const skip = (pageIndex - 1) * pageSize;
      const take = pageSize;
      const data = await this.prismaService.users.findMany({
        where: {
          name: {
            contains: keyword,
          },
        },
        skip,
        take,
      });
      const result = data.map((item) => ({
        ...item,
        skill: this.safeParse(item.skill),
        certification: this.safeParse(item.certification),
      }));
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number) {
    try {
      const existUser = await this.prismaService.users.findUnique({
        where: { id },
      });
      if (!existUser) {
        throw new NotFoundException('user khong ton tai');
      }
      await this.prismaService.users.delete({
        where: { id },
      });
      return { message: 'Xoa thanh cong' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async uploadAvatar(file: UploadApiErrorResponse, id: number) {
    if (!file) {
      throw new Error('File not found.');
    }
    return await this.prismaService.users.update({
      where: { id },
      data: {
        avatar: file.url,
      },
    });
  }
}
