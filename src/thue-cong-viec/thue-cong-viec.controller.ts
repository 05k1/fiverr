import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  HttpStatus,
  Req,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ThueCongViecService } from './thue-cong-viec.service';
import { CreateThueCongViecDto } from './dto/create-thue-cong-viec.dto';
import { UpdateThueCongViecDto } from './dto/update-thue-cong-viec.dto';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ResponseData } from 'src/utils/globalClass';
import { HttpMessage } from 'src/utils/globalEnum';
import { JwtRequest } from 'src/utils/type/Pagination.interface';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('/api/thue-cong-viec')
export class ThueCongViecController {
  constructor(private readonly thueCongViecService: ThueCongViecService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/hoan-thanh-cong-viec/:id')
  async completeJob(@Param('id') id: string) {
    const data = await this.thueCongViecService.completeJob(+id);

    return new ResponseData(data, HttpStatus.OK, HttpMessage.UPDATE);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createThueCongViecDto: CreateThueCongViecDto) {
    const data = await this.thueCongViecService.create(createThueCongViecDto);

    return new ResponseData(data, HttpStatus.CREATED, HttpMessage.CREATE);
  }

  @Get()
  async findAll() {
    const data = await this.thueCongViecService.findAll();
    return new ResponseData(data, HttpStatus.OK, HttpMessage.SUCCESS);
  }

  @ApiQuery({ name: 'pageIndex', type: 'integer', required: false })
  @ApiQuery({ name: 'pageSize', type: 'integer', required: false })
  @ApiQuery({ name: 'keyword', type: 'string', required: false })
  @Get('/phan-trang-tim-kiem')
  async findAllParams(
    @Query('pageIndex') pageIndex: string,
    @Query('pageSize') pageSize: string,
    @Query('keyword') keyword: string,
  ) {
    const data = await this.thueCongViecService.findAllParams({
      pageIndex: pageIndex ? +pageIndex : 1,
      pageSize: pageSize ? +pageSize : 10,
      keyword: keyword ?? '',
    });
    return new ResponseData(data, HttpStatus.OK, HttpMessage.SUCCESS);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateThueCongViecDto: UpdateThueCongViecDto,
  ) {
    return new ResponseData(
      await this.thueCongViecService.update(+id, updateThueCongViecDto),
      HttpStatus.OK,
      HttpMessage.UPDATE,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new ResponseData(
      await this.thueCongViecService.remove(+id),
      HttpStatus.OK,
      HttpMessage.DELETE,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/lay-danh-sach-da-thue')
  async getRentedList(@Req() req: JwtRequest) {
    const { userId } = req.user.data;
    return new ResponseData(
      await this.thueCongViecService.getRentedList(userId),
      HttpStatus.OK,
      HttpMessage.SUCCESS,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new ResponseData(
      await this.thueCongViecService.findOne(+id),
      HttpStatus.OK,
      HttpMessage.SUCCESS,
    );
  }
}
