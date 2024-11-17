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
  Req,
  Put,
  Query,
} from '@nestjs/common';
import { CongViecService } from './cong-viec.service';
import { CreateCongViecDto } from './dto/create-cong-viec.dto';
import { UpdateCongViecDto } from './dto/update-cong-viec.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { json } from 'stream/consumers';

interface JwtRequest extends Request {
  user: {
    data: {
      userId: number;
    };
    iat: number;
    exp: number;
  };
}

@Controller('/api/cong-viec')
@ApiTags('CongViec')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class CongViecController {
  constructor(private readonly congViecService: CongViecService) {}

  @Post()
  create(@Req() req: JwtRequest, @Body() createCongViecDto: CreateCongViecDto) {
    const { userId } = req.user.data;
    return this.congViecService.create({
      ...createCongViecDto,
      creator_id: userId,
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const data = await this.congViecService.findAll();
    return res.status(HttpStatus.OK).json({ data });
  }

  @Get('/phan-trang-tim-kiem')
  @ApiQuery({ name: 'pageIndex', type: 'integer', required: false })
  @ApiQuery({ name: 'pageSize', type: 'integer', required: false })
  @ApiQuery({ name: 'keyword', type: 'string', required: false })
  async findAllQuery(
    @Query('pageIndex') pageIndex: string,
    @Query('pageSize') pageSize: string,
    @Query('keyword') keyword: string,
    @Res() res: Response,
  ) {
    const data = await this.congViecService.findAllQuery({
      pageIndex: pageIndex ? +pageIndex : 1,
      pageSize: pageSize ? +pageSize : 10,
      keyword: keyword ?? '',
    });
    return res.status(HttpStatus.OK).json({ data });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.congViecService.findOne(+id);
  }

  @Put(':id')
  update(
    @Req() req: JwtRequest,
    @Param('id') id: string,
    @Body() updateCongViecDto: UpdateCongViecDto,
  ) {
    const { userId } = req.user.data;
    return this.congViecService.update(+id, {
      ...updateCongViecDto,
      creator_id: userId,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.congViecService.remove(+id);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Entity deleted successfully' });
    } catch (error) {
      return res
        .status(error.status) // Return a 404 Not Found status
        .json({ error: error.message });
    }
  }
}
