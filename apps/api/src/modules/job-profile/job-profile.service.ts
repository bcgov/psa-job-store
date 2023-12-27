import { Injectable } from '@nestjs/common';
import { JobProfileCreateInput } from '../../@generated/prisma-nestjs-graphql';
import { PrismaService } from '../../modules/prisma/prisma.service';
import { ClassificationService } from '../classification/classification.service';
import { SearchService } from '../search/search.service';
import { FindManyJobProfileWithSearch } from './args/find-many-job-profile-with-search.args';

// @InputType()
// class BehaviouralCompetencyConnectInput {
//   @Field(() => Int)
//   id!: number;
// }

// @InputType()
// class BehaviouralCompetencyItemInput {
//   @Field(() => BehaviouralCompetencyConnectInput)
//   behavioural_competency!: BehaviouralCompetencyConnectInput;
// }

// @InputType()
// class BehaviouralCompetenciesInput {
//   @Field(() => [BehaviouralCompetencyItemInput])
//   create!: BehaviouralCompetencyItemInput[];
// }

// @InputType()
// class ClassificationConnectInput {
//   @Field(() => String)
//   id!: string;
// }

// @InputType()
// class ClassificationInput {
//   @Field(() => ClassificationConnectInput)
//   connect!: ClassificationConnectInput;
// }

// @InputType()
// class ParentConnectInput {
//   @Field(() => Int)
//   id!: number;
// }

// @InputType()
// class ParentInput {
//   @Field(() => ParentConnectInput)
//   connect!: ParentConnectInput;
// }

// @InputType()
// class OwnerConnectInput {
//   @Field(() => Int)
//   id!: number;
// }

// @InputType()
// class OwnerInput {
//   @Field(() => OwnerConnectInput)
//   connect!: OwnerConnectInput;
// }

// @InputType()
// export class JobProfileCreateInput {
//   @Field(() => JobProfileState, { nullable: false })
//   state!: keyof typeof JobProfileState;

//   @Field(() => JobStream, { nullable: false })
//   stream!: keyof typeof JobStream;

//   @Field(() => String, { nullable: false })
//   title!: string;

//   @Field(() => Int, { nullable: true })
//   number?: number;

//   @Field(() => String, { nullable: false })
//   context!: string;

//   @Field(() => String, { nullable: false })
//   overview!: string;

//   @Field(() => [String], { nullable: true })
//   requirements?: Array<string>;

//   @Field(() => GraphQLJSON, { nullable: true })
//   accountabilities?: any;

//   @Field(() => BehaviouralCompetenciesInput, { nullable: true })
//   behavioural_competencies?: BehaviouralCompetenciesInput;

//   @Field(() => ClassificationInput, { nullable: false })
//   classification!: ClassificationInput;

//   @Field(() => OwnerInput, { nullable: false })
//   owner!: OwnerInput;

//   @Field(() => ParentInput, { nullable: true })
//   parent?: ParentInput;
// }

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
        classifications: true,
        job_family: true,
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
        classifications: true,
        job_family: true,
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
        number: data.number,
        accountabilities: data.accountabilities,
        requirements: data.requirements,
        classification: data.classification,
        behavioural_competencies: data.behavioural_competencies,
        reports_to: data.reports_to,
        children: data.children,
        family: data.family,
        organization: data.organization,
        owner: data.owner,
        role: data.role,

        parent: data.parent,
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
