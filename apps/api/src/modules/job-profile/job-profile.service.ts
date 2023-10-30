import { Injectable } from '@nestjs/common';
import { FindManyJobProfileArgs } from '../../@generated/prisma-nestjs-graphql';
import { PrismaService } from '../../modules/prisma/prisma.service';
import { ClassificationService } from '../classification/classification.service';

@Injectable()
export class JobProfileService {
  constructor(
    private readonly classificationService: ClassificationService,
    private readonly prisma: PrismaService,
  ) {}

  async getJobProfiles(args?: FindManyJobProfileArgs) {
    return this.prisma.jobProfile.findMany({
      ...args,
      include: {
        behavioural_competencies: true,
        category: true,
        classification: true,
        family: true,
        ministry: true,
        reports_to: true,
        role: true,
      },
    });
  }

  async getJobProfile(id: number) {
    return this.prisma.jobProfile.findUnique({
      where: { id },
      include: {
        category: true,
        classification: true,
        family: true,
        ministry: true,
        role: true,
      },
    });
  }

  async getBehaviouralCompetencies(job_profile_id: number) {
    return this.prisma.jobProfileBehaviouralCompetency.findMany({
      where: { job_profile_id },
      include: {
        behavioural_competency: true,
      },
    });
  }
}
