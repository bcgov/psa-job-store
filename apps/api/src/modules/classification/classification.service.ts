import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClassificationService {
  constructor(private readonly prisma: PrismaService) {}

  async getClassifications() {
    return this.prisma.classification.findMany({
      include: {
        grid: true,
        occupation_group: true,
        dependent_job_profiles: true,
      },
    });
  }

  async getClassification(id: number) {
    return this.prisma.classification.findUnique({
      where: { id },
      include: {
        grid: true,
        occupation_group: true,
        dependent_job_profiles: true,
      },
    });
  }

  async getGrid(id: number) {
    return this.prisma.grid.findUnique({
      where: { id },
    });
  }

  async getOccupationGroup(id: number) {
    return this.prisma.occupationGroup.findUnique({ where: { id } });
  }
}
