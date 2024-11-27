import { Injectable } from '@nestjs/common';
import pino from 'pino';
import { CreateLogDto } from './create-log.dto';

@Injectable()
export class AppLogService {
  private readonly logger;

  constructor() {
    const NODE_ENV = process.env.NODE_ENV;
    let transport;

    if (NODE_ENV !== 'production') {
      // In development, log to the console
      transport = {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      };
    } else {
      // In production, log to a file
      transport = {
        target: 'pino/file',
        options: { destination: '/tmp/log/app.log' },
      };
    }

    this.logger = pino({
      transport: transport,
    });
  }

  async log(createLogDto: CreateLogDto, user: Express.User): Promise<void> {
    const logMessage = `${createLogDto.level}: ${createLogDto.message}`;
    this.logger.error({
      message: logMessage,
      stack: createLogDto.stack,
      path: createLogDto.path,
      userId: user.id,
    });
  }
}
