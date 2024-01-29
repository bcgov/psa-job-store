import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JobProfileScopeService {
  constructor(private readonly prisma: PrismaService) {}

  async getJobProfileScopes() {
    return this.prisma.jobProfileScope.findMany();
  }

  async getJobProfileScope(id: number) {
    return this.prisma.jobProfileScope.findUnique({ where: { id } });
  }
}
