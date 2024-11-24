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
  Put,
} from '@nestjs/common';
import { LoaiCongViecService } from './loai-cong-viec.service';
import { CreateLoaiCongViecDto } from './dto/create-loai-cong-viec.dto';
import { UpdateLoaiCongViecDto } from './dto/update-loai-cong-viec.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { ResponseData } from 'src/utils/globalClass';
import { HttpMessage } from 'src/utils/globalEnum';

@ApiTags('LoaiCongViec')
@Controller('/api/loai-cong-viec')
export class LoaiCongViecController {
  constructor(private readonly loaiCongViecService: LoaiCongViecService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createLoaiCongViecDto: CreateLoaiCongViecDto) {
    const data = await this.loaiCongViecService.create(createLoaiCongViecDto);
    return new ResponseData(data, HttpStatus.CREATED, HttpMessage.CREATE);
  }

  @ApiQuery({ name: 'pageIndex', type: 'integer', required: false })
  @ApiQuery({ name: 'pageSize', type: 'integer', required: false })
  @ApiQuery({ name: 'keyword', type: 'string', required: false })
  @Get()
  async findAll(
    @Query('pageIndex') pageIndex: string,
    @Query('pageSize') pageSize: string,
    @Query('keyword') keyword: string,
  ) {
    const data = await this.loaiCongViecService.findAll({
      pageIndex: pageIndex ? +pageIndex : 1,
      pageSize: pageSize ? +pageSize : 10,
      keyword: keyword ?? '',
    });
    return new ResponseData(data, HttpStatus.OK, HttpMessage.SUCCESS);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.loaiCongViecService.findOne(+id);
    return new ResponseData(data, HttpStatus.OK, HttpMessage.SUCCESS);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLoaiCongViecDto: UpdateLoaiCongViecDto,
  ) {
    const data = await this.loaiCongViecService.update(
      +id,
      updateLoaiCongViecDto,
    );
    return new ResponseData(data, HttpStatus.OK, HttpMessage.SUCCESS);
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
