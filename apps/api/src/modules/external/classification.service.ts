import { Injectable } from '@nestjs/common';
import { FindManyClassificationArgs, FindUniqueClassificationArgs } from '../../@generated/prisma-nestjs-graphql';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClassificationService {
  constructor(private readonly prisma: PrismaService) {}

  async getClassifications(args?: FindManyClassificationArgs) {
    return this.prisma.classification.findMany({
      ...args,
      include: {},
    });
  }

  async getClassification(args?: FindUniqueClassificationArgs) {
    return this.prisma.classification.findUnique({ ...args });
  }
}
