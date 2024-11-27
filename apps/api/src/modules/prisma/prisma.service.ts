import { Injectable, OnModuleInit } from '@nestjs/common';
import { SearchService } from '../search/search.service';
import { ExtendedPrismaClient } from './extended-prisma-client.impl';

@Injectable()
export class PrismaService extends ExtendedPrismaClient implements OnModuleInit {
  constructor(private readonly searchService: SearchService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }
}
