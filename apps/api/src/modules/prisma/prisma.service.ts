import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventsService } from '../utils/event.service';
import { ExtendedPrismaClient } from './extended-prisma-client.impl';

@Injectable()
export class PrismaService extends ExtendedPrismaClient implements OnModuleInit {
  constructor(private readonly eventsService: EventsService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }
}
