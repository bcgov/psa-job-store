import { Injectable } from '@nestjs/common';
import { FindManyJobProfileArgs } from '../../@generated/prisma-nestjs-graphql';
import { PrismaService } from '../../modules/prisma/prisma.service';

@Injectable()
export class JobProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getJobProfiles(args?: FindManyJobProfileArgs) {
    return this.prisma.jobProfile.findMany(args);
  }

  async getJobProfile(id: number) {
    return this.prisma.jobProfile.findUnique({ where: { id } });
  }
}
