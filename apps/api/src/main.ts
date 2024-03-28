import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
// import { ErrorLoggingInterceptor } from './utils/logging/response-logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.enableCors();
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: false, transform: true }));
  app.use(json({ limit: '500kb' })); // to allow large org charts to be submitted
  // app.useGlobalInterceptors(new ErrorLoggingInterceptor());

  await app.listen(4000);
}
bootstrap();
