import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JobFamilyService {
  constructor(private readonly prisma: PrismaService) {}

  async getJobFamilies() {
    return this.prisma.jobProfileJobFamily.findMany();
  }

  async getJobFamily(id: number) {
    return this.prisma.jobProfileJobFamily.findUnique({ where: { id } });
  }
}
