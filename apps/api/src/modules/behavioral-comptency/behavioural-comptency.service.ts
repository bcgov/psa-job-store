import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BehaviouralComptencyService {
  constructor(private readonly prisma: PrismaService) {}

  async getBehaviouralComptencies() {
    return this.prisma.behaviouralCompetency.findMany();
  }

  async getBehaviouralComptency(id: number) {
    return this.prisma.behaviouralCompetency.findUnique({
      where: { id },
    });
  }
}
