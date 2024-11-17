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
} from '@nestjs/common';
import { LoaiCongViecService } from './loai-cong-viec.service';
import { CreateLoaiCongViecDto } from './dto/create-loai-cong-viec.dto';
import { UpdateLoaiCongViecDto } from './dto/update-loai-cong-viec.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ResponseCustom } from 'src/types/res.types';

@ApiTags('LoaiCongViec')
@Controller('/api/loai-cong-viec')
export class LoaiCongViecController {
  constructor(private readonly loaiCongViecService: LoaiCongViecService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() createLoaiCongViecDto: CreateLoaiCongViecDto,
  ): Promise<ResponseCustom> {
    try {
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Created successfully.',
        content: this.loaiCongViecService.create(createLoaiCongViecDto),
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
        content: null,
      };
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
  ) {
    try {
      const { data, pagination } = await this.loaiCongViecService.findAll({
        pageIndex: pageIndex ? +pageIndex : 1,
        pageSize: pageSize ? +pageSize : 10,
        keyword: keyword ?? '',
      });
      return {
        content: data,
        pagination,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        error,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loaiCongViecService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLoaiCongViecDto: UpdateLoaiCongViecDto,
  ) {
    return this.loaiCongViecService.update(+id, updateLoaiCongViecDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loaiCongViecService.remove(+id);
  }
}
