import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JobRoleService {
  constructor(private readonly prisma: PrismaService) {}

  async getJobRoles() {
    console.log('get ministries ');

    return this.prisma.jobRole.findMany();
  }
}
