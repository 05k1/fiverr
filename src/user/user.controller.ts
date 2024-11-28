import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { UserDto } from './dto/user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() body: CreateUserDto,
    @Res() res: Response,
  ): Promise<Response<UserDto>> {
    try {
      const result = await this.userService.create(body);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get()
  async findAll(@Res() res: Response): Promise<Response<UserDto[]>> {
    try {
      const result = await this.userService.findAll();
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get('phan-trang-tim-kiem')
  async findByQuery(
    @Query('pageIndex') pageIndex: string,
    @Query('pageSize') pageSize: string,
    @Query('keyword') keyword: string,
    @Res() res: Response,
  ): Promise<Response<UserDto[]>> {
    try {
      const result = await this.userService.findByQuery(
        +pageIndex,
        +pageSize,
        keyword,
      );
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<UserDto>> {
    try {
      const result = await this.userService.findOne(+id);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @Res() res: Response,
  ): Promise<Response<UserDto>> {
    try {
      const result = await this.userService.update(+id, body);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const result = await this.userService.remove(+id);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
