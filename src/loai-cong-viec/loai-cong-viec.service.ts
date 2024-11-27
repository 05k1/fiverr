import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLoaiCongViecDto } from './dto/create-loai-cong-viec.dto';
import { UpdateLoaiCongViecDto } from './dto/update-loai-cong-viec.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ParamsGetList } from 'src/utils/type/Pagination.interface';

@Injectable()
export class LoaiCongViecService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createLoaiCongViecDto: CreateLoaiCongViecDto) {
    return await this.prismaService.job_categories.create({
      data: createLoaiCongViecDto,
    });
  }

  async findAll({ pageIndex, pageSize, keyword }: ParamsGetList) {
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
      throw error;
    }
  }

  async findOne(id: number) {
    const data = await this.prismaService.job_categories.findFirst({
      where: { id },
    });
    if (!data) {
      throw new NotFoundException('Id not found!');
    }
    return data;
  }

  async update(id: number, updateLoaiCongViecDto: UpdateLoaiCongViecDto) {
    try {
      await this.findOne(id);

      // Update the entity with the provided data
      const data = await this.prismaService.job_categories.update({
        where: { id },
        data: updateLoaiCongViecDto,
      });

      return data;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
      await this.prismaService.job_categories.delete({
        where: { id },
      });

      return null;
    } catch (error) {
      throw error; // Re-throw the error for general handling
    }
  }
}
