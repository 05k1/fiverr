import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class ExceptionLoggerFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    super.catch(exception, host);
  }
}
