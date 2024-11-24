import { HttpStatus } from '@nestjs/common';
import { Pagination } from './type/Pagination.interface';

export class ResponseData<T> {
  constructor(
    public content:
      | { data: T | T[] | null; pagination?: Pagination }
      | T
      | T[]
      | null,
    public statusCode: HttpStatus,
    public message: string,
    public pagination?: Pagination,
  ) {}
}
