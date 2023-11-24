import { Injectable } from '@nestjs/common';
import { FindManyClassificationArgs, FindUniqueClassificationArgs } from '../../@generated/prisma-nestjs-graphql';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClassificationService {
  constructor(private readonly prisma: PrismaService) {}

  async getClassifications({ where, ...args }: FindManyClassificationArgs) {
    const profileClassifications = await this.prisma.jobProfile.findMany({
      select: { classification_id: true },
      distinct: ['classification_id'],
    });
    return this.prisma.classification.findMany({
      where: {
        id: { in: profileClassifications.map((p) => `${p.classification_id}`) },
        ...where,
      },
      ...args,
      include: {},
    });
  }

  async getClassification(args?: FindUniqueClassificationArgs) {
    return this.prisma.classification.findUnique({ ...args });
  }
}
