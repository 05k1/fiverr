import { Injectable } from '@nestjs/common';
import { CreateLoaiCongViecDto } from './dto/create-loai-cong-viec.dto';
import { UpdateLoaiCongViecDto } from './dto/update-loai-cong-viec.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LoaiCongViecService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createLoaiCongViecDto: CreateLoaiCongViecDto) {
    return await this.prismaService.job_categories.create({
      data: createLoaiCongViecDto,
    });
  }

  async findAll({
    pageIndex,
    pageSize,
    keyword,
  }: {
    pageIndex: number;
    pageSize: number;
    keyword: string;
  }) {
    if (isNaN(pageIndex) || isNaN(pageSize) || pageIndex < 1 || pageSize < 1) {
      throw new Error('Invalid page number or page size');
    }
    const skip = (pageIndex - 1) * pageSize;
    const take = pageSize;

    try {
      const data = await this.prismaService.job_categories.findMany({
        where: keyword
          ? {
              OR: [
                {
                  job_category_name: {
                    contains: keyword,
                  },
                },
              ],
            }
          : {},
        skip,
        take,
        orderBy: {
          job_category_name: 'asc',
        },
      });
      return {
        data,
        pagination: {
          total: await this.prismaService.job_categories.count(),
          page: pageIndex,
          pageSize,
        },
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} loaiCongViec`;
  }

  update(id: number, updateLoaiCongViecDto: UpdateLoaiCongViecDto) {
    return `This action updates a #${id} loaiCongViec`;
  }

  remove(id: number) {
    return `This action removes a #${id} loaiCongViec`;
  }
}
