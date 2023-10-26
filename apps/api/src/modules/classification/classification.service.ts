import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClassificationService {
  constructor(private readonly prisma: PrismaService) {}

  async getClassifications() {
    return this.prisma.classification.findMany();
  }
}
