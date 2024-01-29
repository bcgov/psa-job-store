import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JobProfileStreamService {
  constructor(private readonly prisma: PrismaService) {}

  async getJobProfileStreams() {
    return this.prisma.jobProfileStream.findMany();
  }

  async getJobProfileStream(id: number) {
    return this.prisma.jobProfileStream.findUnique({ where: { id } });
  }
}
