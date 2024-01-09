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

  private async getJobProfilesWithSearch(
    search: string,
    where: any,
    args: any,
    state: string = 'PUBLISHED',
    owner_id?: string,
    searchConditions?: any,
  ) {
    // if searchConditions were provided, do a "dumb" search instead of elastic search
    let searchResultIds = null;
    if (!searchConditions) searchResultIds = search != null ? await this.searchService.searchJobProfiles(search) : null;

    return this.prisma.jobProfile.findMany({
      where: {
        ...(searchResultIds != null && { id: { in: searchResultIds } }),
        ...(owner_id != null && { owner_id }),
        ...(searchConditions != null && searchConditions),
        state,
        ...where,
      },
      ...args,
      include: {
        behavioural_competencies: true,
        career_group: true,
        classifications: {
          include: {
            classification: true,
          },
        },
        job_family: true,
        organizations: {
          include: {
            organization: true,
          },
        },
        reports_to: true,
        role: true,
        stream: true,
        context: true,
      },
    });
  }

  private getDraftSearchConditions(userId: string, search: string) {
    let searchConditions = {};
    if (search) {
      // Convert search term to a number
      const searchNumber = parseInt(search, 10);

      // Check if the search term is a valid number and add it to the search conditions
      if (!isNaN(searchNumber)) {
        searchConditions = {
          OR: [
            {
              title: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              number: searchNumber, // Exact match for the number
            },
          ],
        };
      } else {
        // If the search term is not a number, only search by title
        searchConditions = {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        };
      }
    }

    return searchConditions;
  }

  async getJobProfilesDrafts({ search, where, ...args }: FindManyJobProfileWithSearch, userId: string) {
    return await this.getJobProfilesWithSearch(
      search,
      where,
      args,
      'DRAFT',
      userId,
      this.getDraftSearchConditions(userId, search),
    );
  }

  async getJobProfiles({ search, where, ...args }: FindManyJobProfileWithSearch) {
    return await this.getJobProfilesWithSearch(search, where, args);
  }

  async getJobProfile(id: number) {
    return this.prisma.jobProfile.findUnique({
      where: { id },
      include: {
        career_group: true,
        classifications: {
          include: {
            classification: true,
          },
        },
        job_family: true,
        organizations: true,
        role: true,
        stream: true,
        context: true,
      },
    });
  }

  async getJobProfileCount({ search, where }: FindManyJobProfileWithSearch) {
    const searchResultIds = search != null ? await this.searchService.searchJobProfiles(search) : null;

    return await this.prisma.jobProfile.count({
      where: {
        ...(searchResultIds != null && { id: { in: searchResultIds } }),
        // stream: { notIn: ['USER'] },
        state: 'PUBLISHED',
        ...where,
      },
    });
  }

  async getJobProfilesDraftsCount({ search, where }: FindManyJobProfileWithSearch, userId: string) {
    // const searchResultIds = search != null ? await this.searchService.searchJobProfiles(search) : null;
    const searchConditions = this.getDraftSearchConditions(userId, search);

    return await this.prisma.jobProfile.count({
      where: {
        ...searchConditions,
        // ...(searchResultIds != null && { id: { in: searchResultIds } }),
        // stream: { notIn: ['USER'] },
        owner_id: userId,
        state: 'DRAFT',
        ...where,
      },
    });
  }

  async getJobProfilesDraftsMinistries(userId: string) {
    const jobProfiles = await this.prisma.jobProfile.findMany({
      where: { state: 'DRAFT', owner_id: userId },
      select: {
        organizations: {
          select: {
            organization: { select: { name: true, id: true } },
          },
        },
      },
    });

    // Flatten the array of organizations and deduplicate
    const allOrganizations = jobProfiles.flatMap((profile) => profile.organizations.map((o) => o.organization));
    const uniqueOrganizations = Array.from(new Map(allOrganizations.map((org) => [org['id'], org])).values());

    return uniqueOrganizations;
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
        classifications: data.classifications,
        behavioural_competencies: data.behavioural_competencies,
        reports_to: data.reports_to,
        job_family: data.job_family,
        organizations: data.organizations,
        role: data.role,
        type: data.type,
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

  async getJobProfilesCareerGroups() {
    // get unique career groups for all job profiles
    const uniqueCareerGroups = await this.prisma.jobProfile.findMany({
      where: { state: 'PUBLISHED' },
      select: {
        career_group: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      distinct: ['career_group_id'], // Add distinct option to return only distinct career groups
    });

    const careerGroupsArray = uniqueCareerGroups.map((item) => item.career_group);

    return careerGroupsArray;
  }

  async getJobProfilesDraftsCareerGroups(userId: string) {
    // get unique career groups for all job profiles
    const uniqueCareerGroups = await this.prisma.jobProfile.findMany({
      where: { state: 'DRAFT', owner_id: userId },
      select: {
        career_group: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      distinct: ['career_group_id'], // Add distinct option to return only distinct career groups
    });

    const careerGroupsArray = uniqueCareerGroups.map((item) => item.career_group);

    return careerGroupsArray;
  }

  async getJobProfilesMinistries() {
    const jobProfiles = await this.prisma.jobProfile.findMany({
      where: { state: 'PUBLISHED' },
      select: {
        organizations: {
          select: {
            organization: { select: { name: true, id: true } },
          },
        },
      },
    });

    // Flatten the array of organizations and deduplicate
    const allOrganizations = jobProfiles.flatMap((profile) => profile.organizations.map((o) => o.organization));
    const uniqueOrganizations = Array.from(new Map(allOrganizations.map((org) => [org['id'], org])).values());

    return uniqueOrganizations;
  }
}
