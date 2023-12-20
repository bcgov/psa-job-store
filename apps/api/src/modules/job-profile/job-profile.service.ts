import { Injectable } from '@nestjs/common';
import { JobProfileCreateInput } from '../../@generated/prisma-nestjs-graphql';
import { PrismaService } from '../../modules/prisma/prisma.service';
import { ClassificationService } from '../classification/classification.service';
import { SearchService } from '../search/search.service';
import { FindManyJobProfileWithSearch } from './args/find-many-job-profile-with-search.args';

@Injectable()
export class JobProfileService {
  constructor(
    private readonly classificationService: ClassificationService,
    private readonly prisma: PrismaService,
    private readonly searchService: SearchService,
  ) {}

  async getJobProfiles({ search, where, ...args }: FindManyJobProfileWithSearch) {
    const searchResultIds = search != null ? await this.searchService.searchJobProfiles(search) : null;

    return this.prisma.jobProfile.findMany({
      where: {
        ...(searchResultIds != null && { id: { in: searchResultIds } }),
        stream: { notIn: ['USER'] },
        ...where,
      },
      ...args,
      include: {
        behavioural_competencies: true,
        career_group: true,
        classification: true,
        family: true,
        organization: true,
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
        organization: true,
        role: true,
      },
    });
  }

  async getJobProfileCount({ search, where }: FindManyJobProfileWithSearch) {
    const searchResultIds = search != null ? await this.searchService.searchJobProfiles(search) : null;

    return await this.prisma.jobProfile.count({
      where: {
        ...(searchResultIds != null && { id: { in: searchResultIds } }),
        stream: { notIn: ['USER'] },
        ...where,
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
        context: data.context,
        overview: data.overview,
        classification: data.classification,
        number: data.number,
        accountabilities: data.accountabilities,
        requirements: data.requirements,
        behavioural_competencies: data.behavioural_competencies,
        reports_to: data.reports_to,
        children: data.children,
        family: data.family,
        organization: data.organization,
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
        organization: true,
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
