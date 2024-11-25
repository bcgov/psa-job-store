import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import session from 'express-session';
import { Logger } from 'nestjs-pino';
import passport from 'passport';
import { AppModule } from './app.module';
import { AppConfigDto } from './dtos/app-config.dto';
// import { ErrorLoggingInterceptor } from './utils/logging/response-logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get<ConfigService<AppConfigDto, true>>(ConfigService);

  app.use(
    session({
      cookie: {
        httpOnly: true,
        maxAge: 30 * 60 * 1000, // 30 mins,
      },
      resave: false,
      rolling: true,
      saveUninitialized: false,
      secret: configService.get('SESSION_SECRET'),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.enableCors();
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: false, transform: true }));
  app.use(json({ limit: '7000kb' })); // to allow large org charts to be submitted
  // app.useGlobalInterceptors(new ErrorLoggingInterceptor());

  await app.listen(4000);
}
bootstrap();
