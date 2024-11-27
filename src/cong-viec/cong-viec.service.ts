import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCongViecDto } from './dto/create-cong-viec.dto';
import { UpdateCongViecDto } from './dto/update-cong-viec.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CongViecDto } from './dto/cong-viec.dto';
import { Pagination, ParamsGetList } from 'src/utils/type/Pagination.interface';

@Injectable()
export class CongViecService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createCongViecDto: CreateCongViecDto) {
    const data = await this.prismaService.jobs.create({
      data: createCongViecDto,
    });
    return data;
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
    const data = await this.prismaService.jobs.findFirst({
      where: { id: id },
    });
    if (!data) {
      throw new NotFoundException('Job id not found.');
    }
    return data;
  }

  async update(id: number, updateCongViecDto: UpdateCongViecDto) {
    const item = await this.findOne(id);
    if (!item) {
      throw new NotFoundException('Job id not found.');
    }

    const data = await this.prismaService.jobs.update({
      where: { id },
      data: updateCongViecDto,
    });
    return data;
  }

  async remove(id: number) {
    const jobItem = await this.prismaService.jobs.findFirst({ where: { id } });
    if (!jobItem) {
      throw new NotFoundException('Job item with ID not found.');
    }
    return await this.prismaService.jobs.delete({ where: { id } });
  }

  async findAllQuery({
    pageIndex,
    pageSize,
    keyword,
  }: ParamsGetList): Promise<{ data: CongViecDto[]; pagination?: Pagination }> {
    const skip = (pageIndex - 1) * pageSize;
    const take = pageSize;

    try {
      const data: CongViecDto[] = await this.prismaService.jobs.findMany({
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

      return {
        data,
        pagination: {
          total: await this.prismaService.jobs.count(),
          page: pageIndex,
          pageSize,
        },
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getMenuJob() {
    const data = await this.prismaService.job_category_details.findMany({
      include: {
        job_categories: true,
      },
    });
    return data;
  }
}
