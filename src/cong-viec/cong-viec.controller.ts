import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Req,
  Put,
  Query,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { CongViecService } from './cong-viec.service';
import { CreateCongViecDto } from './dto/create-cong-viec.dto';
import { UpdateCongViecDto } from './dto/update-cong-viec.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ResponseData } from 'src/utils/globalClass';
import { HttpMessage } from 'src/utils/globalEnum';
import { CongViecDto } from './dto/cong-viec.dto';
import { JwtRequest } from 'src/utils/type/Pagination.interface';
import { FileUploadDto } from 'src/shared/dto/files-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { CloudUploadService } from 'src/shared/cloudUpload.service';
import { UploadApiErrorResponse } from 'cloudinary';

@Controller('/api/cong-viec')
@ApiTags('CongViec')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class CongViecController {
  constructor(
    private readonly congViecService: CongViecService,
    private readonly cloudUploadService: CloudUploadService,
  ) {}

  @Post('/upload-hinh-cong-viec/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
    required: true,
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadJobImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    try {
      await this.congViecService.findOne(+id);
      const result: UploadApiErrorResponse =
        await this.cloudUploadService.uploadImage(file, 'jobs');
      const data = await this.congViecService.uploadIamgeJob(result, +id);
      return new ResponseData(data, HttpStatus.OK, HttpMessage.UPDATE);
    } catch (error) {
      throw error;
    }
  }

  @Post()
  async create(
    @Req() req: JwtRequest,
    @Body() createCongViecDto: CreateCongViecDto,
  ) {
    const { userId } = req.user.data;
    const data = await this.congViecService.create({
      ...createCongViecDto,
      creator_id: userId,
    });
    return new ResponseData<CongViecDto>(
      data,
      HttpStatus.CREATED,
      HttpMessage.CREATE,
    );
  }

  @Get()
  async findAll() {
    const data = await this.congViecService.findAll();
    return new ResponseData<CongViecDto[]>(
      data,
      HttpStatus.OK,
      HttpMessage.SUCCESS,
    );
  }

  @Get('/phan-trang-tim-kiem')
  @ApiQuery({ name: 'pageIndex', type: 'integer', required: false })
  @ApiQuery({ name: 'pageSize', type: 'integer', required: false })
  @ApiQuery({ name: 'keyword', type: 'string', required: false })
  async findAllQuery(
    @Query('pageIndex') pageIndex: string,
    @Query('pageSize') pageSize: string,
    @Query('keyword') keyword: string,
  ) {
    const { data, pagination } = await this.congViecService.findAllQuery({
      pageIndex: pageIndex ? +pageIndex : 1,
      pageSize: pageSize ? +pageSize : 10,
      keyword: keyword ?? '',
    });

    return new ResponseData<CongViecDto>(
      { data, pagination },
      HttpStatus.OK,
      HttpMessage.SUCCESS,
    );
  }

  @Get('/lay-menu-loai-cong-viec')
  async getMenuJob() {
    return await this.congViecService.getMenuJob();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.congViecService.findOne(+id);
    return new ResponseData<CongViecDto>(
      data,
      HttpStatus.OK,
      HttpMessage.SUCCESS,
    );
  }

  @Put(':id')
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Id not found.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Successfully.' })
  async update(
    @Req() req: JwtRequest,
    @Param('id') id: string,
    @Body() updateCongViecDto: UpdateCongViecDto,
  ) {
    const { userId } = req.user.data;

    const data = await this.congViecService.update(+id, {
      ...updateCongViecDto,
      creator_id: userId,
    });
    return new ResponseData(data, HttpStatus.OK, HttpMessage.UPDATE);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.congViecService.remove(+id);
    return new ResponseData(null, HttpStatus.OK, HttpMessage.DELETE);
  }
}
