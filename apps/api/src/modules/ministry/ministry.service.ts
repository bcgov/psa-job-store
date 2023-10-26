import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../modules/prisma/prisma.service';

@Injectable()
export class MinistryService {
  constructor(private readonly prisma: PrismaService) {}

  async getMinistries() {
    console.log('get ministries ');

    return this.prisma.ministry.findMany();
  }

  // async getMinistry(id: number) {
  //   return this.prisma.ministry.findUnique({ where: { id } });
  // }
}
