import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../modules/prisma/prisma.service';
import { FindManyJobProfileWithSearchArgs } from './models/find-many-job-profile-with-search.args';

@Injectable()
export class JobProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getJobProfiles(args?: FindManyJobProfileWithSearchArgs) {
    const { search } = args;

    console.log('search: ', search);

    return this.prisma.jobProfile.findMany({
      where: {
        title: {
          search,
        },
        context: {
          search,
        },
        overview: {
          search,
        },
      },
    });
  }

  async getJobProfile(id: number) {
    return this.prisma.jobProfile.findUnique({ where: { id } });
  }
}
