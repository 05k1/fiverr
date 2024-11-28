import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBinhLuanDto } from './dto/create-binh-luan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BinhLuanDto } from './dto/binh-luan.dto';
import { UpdateBinhLuanDto } from './dto/update-binh-luan.dto';

@Injectable()
export class BinhLuanService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(body: CreateBinhLuanDto): Promise<BinhLuanDto> {
    const { job_id, commenter_id, comment_date, content, comment_star } = body;
    const existJob = await this.prismaService.jobs.findUnique({
      where: { id: job_id },
    });
    if (!existJob) {
      throw new NotFoundException('Job Id is wrong');
    }
    const existCommenter = await this.prismaService.users.findUnique({
      where: { id: commenter_id },
    });
    if (!existCommenter) {
      throw new NotFoundException('Commenter Id is wrong');
    }
    const result = await this.prismaService.comments.create({
      data: {
        job_id,
        commenter_id,
        comment_date: new Date(comment_date),
        content,
        comment_star,
      },
    });
    return result;
  }

  async update(id: number, body: UpdateBinhLuanDto): Promise<BinhLuanDto> {
    try {
      const existCmt = await this.prismaService.comments.findUnique({
        where: { id },
      });
      if (!existCmt) {
        throw new NotFoundException('binh luan khong ton tai');
      }
      const { job_id, commenter_id, comment_date, content, comment_star } =
        body;
      const existJob = await this.prismaService.jobs.findUnique({
        where: { id: job_id },
      });
      if (!existJob) {
        throw new NotFoundException('Job Id is wrong');
      }
      const existCommenter = await this.prismaService.users.findUnique({
        where: { id: commenter_id },
      });
      if (!existCommenter) {
        throw new NotFoundException('Commenter Id is wrong');
      }
      const result = await this.prismaService.comments.update({
        where: { id },
        data: {
          job_id,
          commenter_id,
          comment_date: new Date(comment_date),
          content,
          comment_star,
        },
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id: number) {
    try {
      const existCmt = await this.prismaService.comments.findUnique({
        where: { id },
      });
      if (!existCmt) {
        throw new NotFoundException('binh luan khong ton tai');
      }
      await this.prismaService.comments.delete({
        where: { id },
      });
      return { message: 'Xoa thanh cong' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<BinhLuanDto[]> {
    try {
      const data = await this.prismaService.comments.findMany();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async finByJob(id): Promise<BinhLuanDto[]> {
    try {
      const job_id = parseInt(id);
      const data = await this.prismaService.comments.findMany({
        where: {
          job_id,
        },
      });
      if (!data) {
        throw new NotFoundException('cong viec nay chua co binh luan');
      }
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}
