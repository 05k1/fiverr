import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExceptionLoggerFilter } from './utils/exceptionLogger.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // add validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const configSwagger = new DocumentBuilder()
    .setTitle('Fiverr API')
    .setDescription('List API fiverr')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionLoggerFilter(httpAdapter));

  const swagger = SwaggerModule.createDocument(app, configSwagger);

  SwaggerModule.setup('api', app, swagger);
  const port = configService.get<number>('PORT') || 8080;
  await app.listen(port);
}
bootstrap();
