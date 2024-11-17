import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { CreateCongViecDto } from './dto/create-cong-viec.dto';
import { UpdateCongViecDto } from './dto/update-cong-viec.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class CongViecService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createCongViecDto: CreateCongViecDto) {
    try {
      return await this.prismaService.jobs.create({
        data: createCongViecDto,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      const data = await this.prismaService.jobs.findMany({});
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number) {
    return await this.prismaService.jobs.findFirst({ where: { id } });
  }

  async update(id: number, updateCongViecDto: UpdateCongViecDto) {
    return await this.prismaService.jobs.update({
      where: { id },
      data: updateCongViecDto,
    });
  }

  async remove(id: number) {
    const jobItem = await this.prismaService.jobs.findFirst({ where: { id } });
    if (!jobItem) {
      throw new BadRequestException('Job item with ID not found.');
    }
    return await this.prismaService.jobs.delete({ where: { id } });
  }

  async findAllQuery({
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
      const data = await this.prismaService.jobs.findMany({
        where: keyword
          ? {
              OR: [
                {
                  job_name: {
                    contains: keyword,
                  },
                },
                {
                  price: {
                    equals: +keyword,
                  },
                },
                {
                  description: {
                    contains: keyword,
                  },
                },
              ],
            }
          : {},
        skip,
        take,
        orderBy: {
          job_name: 'asc',
        },
      });
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
