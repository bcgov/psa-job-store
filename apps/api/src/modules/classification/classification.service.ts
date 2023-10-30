import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClassificationService {
  constructor(private readonly prisma: PrismaService) {}

  async getClassifications() {
    return this.prisma.classification.findMany();
  }

  async getResolvedClassifications() {
    const classificationsWithGrid = this.prisma.classification.findMany({
      include: {
        grid: true,
        occupation_group: true,
      },
    });

    return classificationsWithGrid;
  }
}
