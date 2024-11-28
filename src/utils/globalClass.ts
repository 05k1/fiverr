import { HttpStatus } from '@nestjs/common';
import { Pagination } from './type/Pagination.interface';

export class ResponseData<T> {
  constructor(
    public content: ListAllDto<T> | T | T[] | null,
    public statusCode: HttpStatus,
    public message: string,
  ) {}
}

export interface ListAllDto<T> {
  data: T[];
  pagination: Pagination;
}
