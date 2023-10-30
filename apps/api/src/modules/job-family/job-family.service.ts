import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JobFamilyService {
  constructor(private readonly prisma: PrismaService) {}

  async getJobFamilies() {
    console.log('get ministries ');

    return this.prisma.jobFamily.findMany();
  }
}
