import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateChiTietLoaiCongViecDto } from './dto/create-chi-tiet-loai-cong-viec.dto';
import { UpdateChiTietLoaiCongViecDto } from './dto/update-chi-tiet-loai-cong-viec.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChiTietLoaiCongViecService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(
    body: CreateChiTietLoaiCongViecDto,
  ): Promise<CreateChiTietLoaiCongViecDto> {
    try {
      const { detail_name } = body;
      const result = await this.prismaService.job_category_details.create({
        data: { detail_name },
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<CreateChiTietLoaiCongViecDto[]> {
    try {
      const data = await this.prismaService.job_category_details.findMany({
        include: {
          job_categories: true,
        },
      });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.prismaService.job_category_details.findUnique({
        where: {
          id,
        },
        include: {
          job_categories: true,
        },
      });
      if (!data) {
        throw new NotFoundException('Not found');
      }
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(
    id: number,
    body: UpdateChiTietLoaiCongViecDto,
  ): Promise<CreateChiTietLoaiCongViecDto> {
    try {
      const existJobDetail =
        await this.prismaService.job_category_details.findUnique({
          where: { id },
        });
      if (!existJobDetail) {
        throw new NotFoundException('Not found');
      }
      const { detail_name, image, job_category_id } = body;
      const existIdJobCategory =
        await this.prismaService.job_categories.findUnique({
          where: { id: job_category_id },
        });
      if (!existIdJobCategory) {
        throw new BadRequestException('job_category_id khong dung');
      }
      const result = await this.prismaService.job_category_details.update({
        where: { id },
        data: { detail_name, image, job_category_id },
        include: {
          job_categories: true,
        },
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number) {
    try {
      const existjobDetail =
        await this.prismaService.job_category_details.findUnique({
          where: { id },
        });
      if (!existjobDetail) {
        throw new NotFoundException('Not found');
      }
      await this.prismaService.job_category_details.delete({
        where: { id },
      });
      return { message: 'Xoa thanh cong' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByQuery(
    pageIndex: number,
    pageSize: number,
    keyword: string,
  ): Promise<CreateChiTietLoaiCongViecDto[]> {
    try {
      const skip = (pageIndex - 1) * pageSize;
      const take = pageSize;
      const data = await this.prismaService.job_category_details.findMany({
        where: {
          detail_name: {
            contains: keyword,
          },
        },
        skip,
        take,
      });
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}
