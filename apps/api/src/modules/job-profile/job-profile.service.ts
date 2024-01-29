import { Injectable } from '@nestjs/common';
import { JobProfileState, JobProfileType, Prisma } from '@prisma/client';
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
      orderBy: [...(args.orderBy || []), { id: 'desc' }],
      include: {
        behavioural_competencies: true,
        classifications: {
          include: {
            classification: true,
          },
        },
        jobFamilies: {
          include: {
            jobFamily: true,
          },
        },
        organizations: {
          include: {
            organization: true,
          },
        },
        reports_to: true,
        role: true,
        streams: {
          include: {
            stream: true,
          },
        },
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
        classifications: {
          include: {
            classification: true,
          },
        },
        jobFamilies: {
          include: {
            jobFamily: true,
          },
        },
        organizations: {
          include: {
            organization: true,
          },
        },
        scope: true,
        role: true,
        role_type: true,
        streams: {
          include: {
            stream: true,
          },
        },
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

  async createOrUpdateJobProfile(data: JobProfileCreateInput, userId: string, id?: number) {
    // todo: catch the "number" constraint failure and process the error on the client appropriately

    const result = this.prisma.jobProfile.upsert({
      where: { id: id || -1 },
      create: {
        behavioural_competencies: {
          create: data.behavioural_competencies.create.map((item) => ({
            behavioural_competency: {
              connect: { id: item.behavioural_competency.connect.id },
            },
          })),
        },
        ...(data.classifications && {
          classifications: {
            create: data.classifications.create.map((item) => ({
              classification: {
                connect: { id: item.classification.connect.id },
              },
            })),
          },
        }),
        organizations: {
          create: data.organizations.create.map((item) => ({
            organization: {
              connect: { id: item.organization.connect.id },
            },
          })),
        },
        context: {
          create: { description: data.context.create.description },
        },

        ...(data.role && {
          role: {
            connect: { id: data.role.connect.id },
          },
        }),
        role_type: {
          connect: { id: data.role_type.connect.id },
        },

        ...(data.scope && {
          scope: {
            connect: { id: data.scope.connect.id },
          },
        }),
        state: JobProfileState.DRAFT,
        type: data.organizations.create.length > 0 ? JobProfileType.MINISTRY : JobProfileType.CORPORATE, // should be MINISTRY if ministries provided, otherwise corporate
        owner: {
          connect: { id: userId },
        },
        jobFamilies: {
          create: data.jobFamilies.create.map((item) => ({
            jobFamily: {
              connect: { id: item.jobFamily.connect.id },
            },
          })),
        },
        streams: {
          create: data.streams.create.map((item) => ({
            stream: {
              connect: { id: item.stream.connect.id },
            },
          })),
        },
        program_overview: data.program_overview,
        review_required: data.review_required,
        title: data.title,
        number: data.number,
        overview: data.overview,
        accountabilities: data.accountabilities,
        requirements: data.requirements,
        professional_registration_requirements: data.professional_registration_requirements,
        preferences: data.preferences,
        knowledge_skills_abilities: data.knowledge_skills_abilities,
        willingness_statements: data.willingness_statements,
        security_screenings: data.security_screenings,
        all_reports_to: data.all_reports_to,
        all_organizations: data.all_organizations,
        reports_to: {
          create: data.reports_to.create.map((item) => ({
            classification: {
              connect: { id: item.classification.connect.id },
            },
          })),
        },
        total_comp_create_form_misc: data.total_comp_create_form_misc,
      } as any as Prisma.JobProfileCreateInput, // To prevent Excessive Stack Depth error,
      update: {
        title: data.title,
        number: data.number,
        overview: data.overview,
        program_overview: data.program_overview,
        review_required: data.review_required,
        state: data.state,

        behavioural_competencies: {
          deleteMany: {}, // Deletes all existing competencies for this job profile
          create: data.behavioural_competencies.create.map((item) => ({
            behavioural_competency: { connect: { id: item.behavioural_competency.connect.id } },
          })),
        },

        ...(data.classifications && {
          classifications: {
            deleteMany: {},
            create: data.classifications.create.map((item) => ({
              classification: {
                connect: { id: item.classification.connect.id },
              },
            })),
          },
        }),

        // // Update or create classifications
        // classifications: {
        //   deleteMany: {},
        //   create: data.classifications.create.map((item) => ({
        //     classification: { connect: { id: item.classification.connect.id } },
        //   })),
        // },

        // Update or create organizations
        organizations: {
          deleteMany: {},
          create: data.organizations.create.map((item) => ({
            organization: { connect: { id: item.organization.connect.id } },
          })),
        },

        // Update context
        context: {
          update: { description: data.context.create.description },
        },

        // Connect role, role_type, and scope
        ...(data.role && {
          role: {
            connect: { id: data.role.connect.id },
          },
        }),

        role_type: { connect: { id: data.role_type.connect.id } },

        ...(data.scope && {
          scope: {
            connect: { id: data.scope.connect.id },
          },
        }),

        // Update jobFamilies
        jobFamilies: {
          deleteMany: {},
          create: data.jobFamilies.create.map((item) => ({
            jobFamily: { connect: { id: item.jobFamily.connect.id } },
          })),
        },

        // Update streams
        streams: {
          deleteMany: {},
          create: data.streams.create.map((item) => ({
            stream: { connect: { id: item.stream.connect.id } },
          })),
        },

        // Update accountabilities, requirements, and other string arrays
        accountabilities: data.accountabilities,
        requirements: data.requirements,
        professional_registration_requirements: data.professional_registration_requirements,
        preferences: data.preferences,
        knowledge_skills_abilities: data.knowledge_skills_abilities,
        willingness_statements: data.willingness_statements,
        security_screenings: data.security_screenings,
        all_reports_to: data.all_reports_to,
        all_organizations: data.all_organizations,

        // Update reports_to
        reports_to: {
          deleteMany: {},
          create: data.reports_to.create.map((item) => ({
            classification: { connect: { id: item.classification.connect.id } },
          })),
        },

        // Update miscellaneous data
        total_comp_create_form_misc: data.total_comp_create_form_misc,
      },
    });

    return result;
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
    // todo: this is now professions
    // get unique career groups for all job profiles
    // const uniqueCareerGroups = await this.prisma.jobProfile.findMany({
    //   where: { state: 'PUBLISHED' },
    //   select: {
    //     career_group: {
    //       select: {
    //         id: true,
    //         name: true,
    //       },
    //     },
    //   },
    //   distinct: ['career_group_id'], // Add distinct option to return only distinct career groups
    // });

    // const careerGroupsArray = uniqueCareerGroups.map((item) => item.career_group);

    // return careerGroupsArray;
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getJobProfilesDraftsCareerGroups(_userId: string) {
    // todo: this is now professions
    // get unique career groups for all job profiles
    // const uniqueCareerGroups = await this.prisma.jobProfile.findMany({
    //   where: { state: 'DRAFT', owner_id: userId },
    //   select: {
    //     career_group: {
    //       select: {
    //         id: true,
    //         name: true,
    //       },
    //     },
    //   },
    //   distinct: ['career_group_id'], // Add distinct option to return only distinct career groups
    // });

    // const careerGroupsArray = uniqueCareerGroups.map((item) => item.career_group);

    // return careerGroupsArray;
    return null;
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

  async getNextAvailableNumber(): Promise<number> {
    const maxNumber = await this.prisma.jobProfile.aggregate({
      _max: {
        number: true,
      },
    });
    return (maxNumber._max.number || 0) + 1;
  }

  async isNumberAvailable(number: number): Promise<boolean> {
    const count = await this.prisma.jobProfile.count({
      where: {
        number,
      },
    });
    return count === 0;
  }
}
