import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JobFamilyService {
  constructor(private readonly prisma: PrismaService) {}

  async getJobFamilies() {
    const profileJobFamilies = await this.prisma.jobProfile.findMany({
      select: { family_id: true },
      distinct: ['family_id'],
    });

    return this.prisma.jobFamily.findMany({
      where: {
        id: { in: profileJobFamilies.map((p) => p.family_id) },
      },
    });
  }

  async getJobFamily(id: number) {
    return this.prisma.jobFamily.findUnique({ where: { id } });
  }
}
