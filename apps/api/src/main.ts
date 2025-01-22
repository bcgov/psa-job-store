import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json } from 'express';
import session from 'express-session';
import { Logger } from 'nestjs-pino';
import passport from 'passport';
import { AppModule } from './app.module';
import { AppConfigDto } from './dtos/app-config.dto';
import { getSessionStore } from './utils/session.utils';
// import { ErrorLoggingInterceptor } from './utils/logging/response-logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true });
  const configService = app.get<ConfigService<AppConfigDto, true>>(ConfigService);
  app.enableCors({
    credentials: true,
    origin: configService.get('REACT_APP_URL'),
  });

  app.use(
    session({
      cookie: {
        httpOnly: true,
        maxAge: configService.get('E2E_TESTING') === 'true' ? 24 * 60 * 60 * 1000 : 30 * 60 * 1000, // 24 hours/30 mins,
        secure: 'auto', //process.env.NODE_ENV === 'production' ? true : 'auto', // should always be true for production
      },
      resave: false,
      rolling: true,
      saveUninitialized: false,
      secret: configService.get('SESSION_SECRET'),
      store: getSessionStore(),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: false, transform: true }));
  app.use(json({ limit: '7000kb' })); // to allow large org charts to be submitted
  // app.useGlobalInterceptors(new ErrorLoggingInterceptor());

  await app.listen(4000);
}
bootstrap();
