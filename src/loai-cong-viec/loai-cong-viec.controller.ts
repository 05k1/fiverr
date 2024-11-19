import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Query,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { LoaiCongViecService } from './loai-cong-viec.service';
import { CreateLoaiCongViecDto } from './dto/create-loai-cong-viec.dto';
import { UpdateLoaiCongViecDto } from './dto/update-loai-cong-viec.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@ApiTags('LoaiCongViec')
@Controller('/api/loai-cong-viec')
export class LoaiCongViecController {
  constructor(private readonly loaiCongViecService: LoaiCongViecService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() createLoaiCongViecDto: CreateLoaiCongViecDto,
    @Res() res: Response,
  ) {
    try {
      await this.loaiCongViecService.create(createLoaiCongViecDto);
      return res.status(HttpStatus.CREATED).json({ message: 'Created!' });
    } catch (error) {
      res.locals.standardResponse({ data: null, error });
    }
  }

  @ApiQuery({ name: 'pageIndex', type: 'integer', required: false })
  @ApiQuery({ name: 'pageSize', type: 'integer', required: false })
  @ApiQuery({ name: 'keyword', type: 'string', required: false })
  @Get()
  async findAll(
    @Query('pageIndex') pageIndex: string,
    @Query('pageSize') pageSize: string,
    @Query('keyword') keyword: string,
    @Res() res: Response,
  ) {
    try {
      const response = await this.loaiCongViecService.findAll({
        pageIndex: pageIndex ? +pageIndex : 1,
        pageSize: pageSize ? +pageSize : 10,
        keyword: keyword ?? '',
      });
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      return res.status(HttpStatus.OK).json({
        data: await this.loaiCongViecService.findOne(+id),
        message: 'Successfully!',
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json(error);
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLoaiCongViecDto: UpdateLoaiCongViecDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.loaiCongViecService.update(
        +id,
        updateLoaiCongViecDto,
      );
      return res.status(HttpStatus.OK).json({ message: 'Updated!' });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json(error);
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.loaiCongViecService.remove(+id);
      return res.status(HttpStatus.OK).json({ data: [], message: 'Deleted!' });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  }
}
