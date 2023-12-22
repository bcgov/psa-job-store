import { Injectable } from '@nestjs/common';
import { FindManyBehaviouralCompetencyArgs } from '../../@generated/prisma-nestjs-graphql';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BehaviouralComptencyService {
  constructor(private readonly prisma: PrismaService) {}

  async getBehaviouralComptencies(args?: FindManyBehaviouralCompetencyArgs) {
    return this.prisma.behaviouralCompetency.findMany({ ...args });
  }

  async getBehaviouralComptency(id: number) {
    return this.prisma.behaviouralCompetency.findUnique({
      where: { id },
    });
  }
}
