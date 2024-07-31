import { Injectable, OnModuleInit } from '@nestjs/common';
import { ExtendedPrismaClient } from './extended-prisma-client.impl';

@Injectable()
export class PrismaService extends ExtendedPrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
