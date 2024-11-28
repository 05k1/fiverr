import {
  Controller,
  Post,
  Body,
  UseGuards,
  Res,
  HttpStatus,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { BinhLuanService } from './binh-luan.service';
import { CreateBinhLuanDto } from './dto/create-binh-luan.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { BinhLuanDto } from './dto/binh-luan.dto';
import { UpdateBinhLuanDto } from './dto/update-binh-luan.dto';

@ApiTags('BinhLuan')
@Controller('api/binh-luan')
export class BinhLuanController {
  constructor(private readonly binhLuanService: BinhLuanService) {}

  @Get()
  async findAll(@Res() res: Response): Promise<Response<BinhLuanDto[]>> {
    try {
      const result = await this.binhLuanService.findAll();
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() body: CreateBinhLuanDto,
    @Res() res: Response,
  ): Promise<Response<BinhLuanDto>> {
    try {
      const result = await this.binhLuanService.create(body);
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
    @Body() body: UpdateBinhLuanDto,
    @Res() res: Response,
  ): Promise<Response<BinhLuanDto>> {
    try {
      const result = await this.binhLuanService.update(+id, body);
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
  async delete(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const result = await this.binhLuanService.delete(+id);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get('lay-binh-luan-theo-cong-viec/:id')
  async findByJob(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<BinhLuanDto[]>> {
    try {
      const result = await this.binhLuanService.finByJob(+id);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
