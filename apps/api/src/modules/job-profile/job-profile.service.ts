import { Injectable } from '@nestjs/common';
import { FindManyJobProfileArgs, JobProfileCreateInput } from '../../@generated/prisma-nestjs-graphql';
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
        career_group: true,
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
        career_group: true,
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

  async createJobProfile(data: JobProfileCreateInput) {
    return this.prisma.jobProfile.create({
      data: {
        state: data.state,
        stream: data.stream,
        title: data.title,
        number: data.number,
        context: data.context,
        overview: data.overview,
        accountabilities: data.accountabilities,
        requirements: data.requirements,
        behavioural_competencies: data.behavioural_competencies,
        reports_to: data.reports_to,
        children: data.children,
        classification: data.classification,
        family: data.family,
        ministry: data.ministry,
        owner: data.owner,
        parent: data.parent,
        role: data.role,
      },
      include: {
        behavioural_competencies: true,
        reports_to: true,
        children: true,
        classification: true,
        family: true,
        ministry: true,
        owner: true,
        parent: true,
        role: true,
      },
    });
  }

  async getReportsTo(job_profile_id: number) {
    return this.prisma.jobProfileReportsTo.findMany({
      where: { job_profile_id },
      include: {
        classification: true,
      },
    });
  }
}
