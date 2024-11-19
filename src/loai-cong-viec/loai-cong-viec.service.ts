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
        content: data,
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
      const entity = await this.prismaService.job_categories.findFirst({
        where: { id },
      });
      if (!entity) {
        throw new NotFoundException('job_categories not found');
      }

      // Update the entity with the provided data
      await this.prismaService.job_categories.update({
        where: { id },
        data: updateLoaiCongViecDto,
      });

      return true;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const deletedJobCategory = await this.prismaService.job_categories.delete(
        {
          where: { id },
        },
      );

      return deletedJobCategory;
    } catch (error) {
      throw error; // Re-throw the error for general handling
    }
  }
}
