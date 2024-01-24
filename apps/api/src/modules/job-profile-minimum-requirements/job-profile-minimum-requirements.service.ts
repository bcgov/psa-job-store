import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JobProfileMinimumRequirementsService {
  constructor(private readonly prisma: PrismaService) {}

  async getJobProfileMinimumRequirements() {
    return this.prisma.jobProfileMinimumRequirements.findMany();
  }

  async getJobProfileMinimumRequirement(id: number) {
    return this.prisma.jobProfileMinimumRequirements.findUnique({ where: { id } });
  }
}
