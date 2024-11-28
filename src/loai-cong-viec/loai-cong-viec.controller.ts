import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { LoaiCongViecService } from './loai-cong-viec.service';
import { CreateLoaiCongViecDto } from './dto/create-loai-cong-viec.dto';
import { UpdateLoaiCongViecDto } from './dto/update-loai-cong-viec.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ResponseData } from '../utils/globalClass';
import { HttpMessage } from '../utils/globalEnum';
import { LoaiCongViecDto } from './dto/loai-cong-viec.dto';

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
  async findOne(
    @Param('id') id: string,
  ): Promise<ResponseData<LoaiCongViecDto>> {
    const data = await this.loaiCongViecService.findOne(+id);
    return new ResponseData(data, HttpStatus.OK, HttpMessage.SUCCESS);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLoaiCongViecDto: UpdateLoaiCongViecDto,
  ): Promise<ResponseData<LoaiCongViecDto>> {
    const data = await this.loaiCongViecService.update(
      +id,
      updateLoaiCongViecDto,
    );
    return new ResponseData(data, HttpStatus.OK, HttpMessage.UPDATE);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseData<any>> {
    const data = await this.loaiCongViecService.remove(+id);
    return new ResponseData(data, HttpStatus.OK, HttpMessage.DELETE);
  }
}
