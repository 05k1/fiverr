import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
  Put,
  Query,
} from '@nestjs/common';
import { ChiTietLoaiCongViecService } from './chi-tiet-loai-cong-viec.service';
import { CreateChiTietLoaiCongViecDto } from './dto/create-chi-tiet-loai-cong-viec.dto';
import { UpdateChiTietLoaiCongViecDto } from './dto/update-chi-tiet-loai-cong-viec.dto';
import { Response } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/chi-tiet-loai-cong-viec')
export class ChiTietLoaiCongViecController {
  constructor(
    private readonly chiTietLoaiCongViecService: ChiTietLoaiCongViecService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() body: CreateChiTietLoaiCongViecDto,
    @Res() res: Response,
  ): Promise<Response<CreateChiTietLoaiCongViecDto>> {
    try {
      const result = await this.chiTietLoaiCongViecService.create(body);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get()
  async findAll(
    @Res() res: Response,
  ): Promise<Response<CreateChiTietLoaiCongViecDto[]>> {
    try {
      const result = await this.chiTietLoaiCongViecService.findAll();
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
  ): Promise<Response<CreateChiTietLoaiCongViecDto[]>> {
    try {
      const result = await this.chiTietLoaiCongViecService.findByQuery(
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
  ): Promise<Response<CreateChiTietLoaiCongViecDto>> {
    try {
      const result = await this.chiTietLoaiCongViecService.findOne(+id);
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
    @Body() body: UpdateChiTietLoaiCongViecDto,
    @Res() res: Response,
  ): Promise<Response<UpdateChiTietLoaiCongViecDto>> {
    try {
      const result = await this.chiTietLoaiCongViecService.update(+id, body);
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
      const result = await this.chiTietLoaiCongViecService.remove(+id);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
