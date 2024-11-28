import { Test, TestingModule } from '@nestjs/testing';
import { LoaiCongViecController } from './loai-cong-viec.controller';
import { LoaiCongViecService } from './loai-cong-viec.service';
import { PrismaService } from '../prisma/prisma.service';
import { ListAllDto, ResponseData } from '../utils/globalClass';
import { LoaiCongViecDto } from './dto/loai-cong-viec.dto';

describe('LoaiCongViecController', () => {
  let controller: LoaiCongViecController;
  let service: LoaiCongViecService;
  const idMock = '1';
  const mockLoaiCongViecDto: LoaiCongViecDto = {
    id: 1,
    job_category_name: 'Developer',
  };

  const mockResponseData: ResponseData<LoaiCongViecDto> = {
    content: mockLoaiCongViecDto,
    message: 'Successfully.',
    statusCode: 200,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoaiCongViecController],
      providers: [LoaiCongViecService, PrismaService],
    }).compile();

    controller = module.get<LoaiCongViecController>(LoaiCongViecController);
    service = module.get<LoaiCongViecService>(LoaiCongViecService);
    jest.spyOn(service, 'findOne').mockResolvedValue(mockLoaiCongViecDto);
  });

  //   it('should be defined', () => {
  //     expect(controler).toBeDefined();
  //   });

  it('should find a loaiCongViec by id', async () => {
    const result = await controller.findOne(idMock);
    expect(result).toEqual(mockResponseData);
  });

  it('should return all loaiCongViecs', async () => {
    // Arrange
    const mockLoaiCongViecs: ListAllDto<LoaiCongViecDto> = {
      data: [
        { id: 1, job_category_name: 'Developer' },
        { id: 2, job_category_name: 'Designer' },
      ],
      pagination: {
        page: 1,
        pageSize: 10,
        total: 0,
      },
    };

    const mockResponseData: ResponseData<LoaiCongViecDto> = {
      content: mockLoaiCongViecs,
      message: 'Successfully.',
      statusCode: 200,
    };

    jest.spyOn(service, 'findAll').mockResolvedValue(mockLoaiCongViecs);

    // Act
    const result = await controller.findAll('1', '10', '');

    // Assert
    expect(result).toEqual(mockResponseData);
    expect(service.findAll).toHaveBeenCalled();
  });
});
