import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateThueCongViecDto } from './dto/create-thue-cong-viec.dto';
import { UpdateThueCongViecDto } from './dto/update-thue-cong-viec.dto';
import { ParamsGetList } from 'src/utils/type/Pagination.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CongViecService } from 'src/cong-viec/cong-viec.service';
import { ListAllDto } from 'src/utils/globalClass';
import { ThueCongViecDto } from './dto/thue-cong-viec.dto';

@Injectable()
export class ThueCongViecService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly congViecService: CongViecService,
  ) {}
  async create(
    createThueCongViecDto: CreateThueCongViecDto,
  ): Promise<ThueCongViecDto> {
    try {
      await this.congViecService.findOne(createThueCongViecDto.job_id);

      const newData: CreateThueCongViecDto = {
        ...createThueCongViecDto,
        rental_date: new Date(),
        completed: false,
      };

      const data = await this.prismaService.job_rentals.create({
        data: newData,
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<ThueCongViecDto[]> {
    try {
      const data = await this.prismaService.job_rentals.findMany({});
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAllParams({
    pageIndex,
    pageSize,
    keyword,
  }: ParamsGetList): Promise<ListAllDto<ThueCongViecDto>> {
    const skip = (pageIndex - 1) * pageSize;
    const take = pageSize;

    try {
      const data = await this.prismaService.job_rentals.findMany({
        where: keyword
          ? {
              OR: [
                {
                  jobs: {
                    job_name: { contains: keyword },
                  },
                },
                {
                  users: {
                    name: { contains: keyword },
                  },
                },
              ],
            }
          : {},
        skip,
        take,
      });

      return {
        data,
        pagination: {
          total: await this.prismaService.job_rentals.count(),
          page: pageIndex,
          pageSize,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<ThueCongViecDto> {
    const data = await this.prismaService.job_rentals.findFirst({
      where: { id },
    });
    if (!data) {
      throw new NotFoundException('Job rentals not found.');
    }
    return data;
  }

  async update(
    id: number,
    updateThueCongViecDto: UpdateThueCongViecDto,
  ): Promise<ThueCongViecDto> {
    await this.findOne(id);
    await this.congViecService.findOne(updateThueCongViecDto.job_id);
    const data = await this.prismaService.job_rentals.update({
      where: { id },
      data: updateThueCongViecDto,
    });
    return data;
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
      await this.prismaService.job_rentals.delete({
        where: { id },
      });
      return null;
    } catch (error) {
      throw error;
    }
  }

  async getRentedList(id: number) {
    try {
      const data = await this.prismaService.job_rentals.findMany({
        where: { renter_id: id },
        select: {
          id: true,
          completed: true,
          rental_date: true,
          jobs: true,
        },
      });
      if (!data) {
        throw new NotFoundException('User not found.');
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async completeJob(id: number): Promise<ThueCongViecDto> {
    try {
      await this.findOne(id);
      const data = await this.prismaService.job_rentals.update({
        where: { id },
        data: { completed: true },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
}
