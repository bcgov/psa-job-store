/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { JobProfile, JobProfileState, JobProfileType, Prisma } from '@prisma/client';
import { JobProfileCreateInput } from '../../@generated/prisma-nestjs-graphql';
import { PrismaService } from '../../modules/prisma/prisma.service';
import { AlexandriaError } from '../../utils/alexandria-error';
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
        owner: true,
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
        role_type: true,
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

  async getJobProfilesDrafts(
    {
      search,
      where,
      sortByClassificationName,
      sortByJobFamily,
      sortByOrganization,
      sortOrder,
      ...args
    }: FindManyJobProfileWithSearch,
    userId: string,
  ) {
    const jobProfiles = await this.getJobProfilesWithSearch(
      search,
      where,
      args,
      'DRAFT',
      // userId,
      null,
      this.getDraftSearchConditions(userId, search),
    );

    if (sortByClassificationName) {
      return this.sortJobProfilesByClassification(jobProfiles, sortOrder);
    }

    if (sortByJobFamily) {
      return this.sortJobProfilesByJobFamily(jobProfiles, sortOrder);
    }

    if (sortByOrganization) {
      return this.sortJobProfilesByOrganization(jobProfiles, sortOrder);
    }

    return jobProfiles;
  }

  async getJobProfiles({
    search,
    where,
    sortByClassificationName,
    sortByJobFamily,
    sortByOrganization,
    sortOrder,
    ...args
  }: FindManyJobProfileWithSearch) {
    const jobProfiles = await this.getJobProfilesWithSearch(search, where, args);

    if (sortByClassificationName) {
      return this.sortJobProfilesByClassification(jobProfiles, sortOrder);
    }

    if (sortByJobFamily) {
      return this.sortJobProfilesByJobFamily(jobProfiles, sortOrder);
    }

    if (sortByOrganization) {
      return this.sortJobProfilesByOrganization(jobProfiles, sortOrder);
    }

    return jobProfiles;
  }

  private async sortJobProfilesByClassification(jobProfiles: JobProfile[], sortOrder: string): Promise<JobProfile[]> {
    const firstClassificationNameMap = new Map<number, string>();

    for (const profile of jobProfiles) {
      const classifications = await this.prisma.jobProfileClassification.findMany({
        where: { job_profile_id: profile.id },
        include: { classification: true },
        orderBy: { classification: { name: 'asc' } }, // Sorting classifications for each profile
      });

      if (classifications.length > 0) {
        firstClassificationNameMap.set(profile.id, classifications[0].classification.name);
      }
    }

    // Adjust the sorting based on the sortOrder parameter
    return jobProfiles.sort((a, b) => {
      const nameA = firstClassificationNameMap.get(a.id) || '';
      const nameB = firstClassificationNameMap.get(b.id) || '';

      // If sortOrder is 'desc', reverse the comparison order
      return sortOrder === 'desc' ? nameB.localeCompare(nameA) : nameA.localeCompare(nameB);
    });
  }

  private async sortJobProfilesByJobFamily(jobProfiles: JobProfile[], sortOrder: string): Promise<JobProfile[]> {
    const firstClassificationNameMap = new Map<number, string>();

    for (const profile of jobProfiles) {
      const classifications = await this.prisma.jobProfileJobFamilyLink.findMany({
        where: { jobProfileId: profile.id },
        include: { jobFamily: true },
        orderBy: { jobFamily: { name: 'asc' } }, // Sorting classifications for each profile
      });

      if (classifications.length > 0) {
        firstClassificationNameMap.set(profile.id, classifications[0].jobFamily.name);
      }
    }

    // Adjust the sorting based on the sortOrder parameter
    return jobProfiles.sort((a, b) => {
      const nameA = firstClassificationNameMap.get(a.id) || '';
      const nameB = firstClassificationNameMap.get(b.id) || '';

      // If sortOrder is 'desc', reverse the comparison order
      return sortOrder === 'desc' ? nameB.localeCompare(nameA) : nameA.localeCompare(nameB);
    });
  }

  private async sortJobProfilesByOrganization(jobProfiles: JobProfile[], sortOrder: string): Promise<JobProfile[]> {
    const firstClassificationNameMap = new Map<number, string>();

    for (const profile of jobProfiles) {
      const classifications = await this.prisma.jobProfileOrganization.findMany({
        where: { job_profile_id: profile.id },
        include: { organization: true },
        orderBy: { organization: { name: 'asc' } }, // Sorting classifications for each profile
      });

      if (classifications.length > 0) {
        firstClassificationNameMap.set(profile.id, classifications[0].organization.name);
      }
    }

    // Adjust the sorting based on the sortOrder parameter
    return jobProfiles.sort((a, b) => {
      const nameA = firstClassificationNameMap.get(a.id) || '';
      const nameB = firstClassificationNameMap.get(b.id) || '';

      // If sortOrder is 'desc', reverse the comparison order
      return sortOrder === 'desc' ? nameB.localeCompare(nameA) : nameA.localeCompare(nameB);
    });
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
        // owner_id: userId,
        state: 'DRAFT',
        ...where,
      },
    });
  }

  async getJobProfilesDraftsMinistries(userId: string) {
    const jobProfiles = await this.prisma.jobProfile.findMany({
      where: {
        state: 'DRAFT',
        // owner_id: userId
      },
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

    const result = await this.prisma.jobProfile.upsert({
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
        state: data.state ? data.state : JobProfileState.DRAFT,
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
        education: data.education,
        job_experience: data.job_experience,
        professional_registration_requirements: data.professional_registration_requirements,
        optional_requirements: data.optional_requirements,
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

        ...(data.state && { state: data.state }),

        behavioural_competencies: {
          deleteMany: {}, // Deletes all existing competencies for this job profile
          create: data.behavioural_competencies.create.map((item) => ({
            behavioural_competency: { connect: { id: item.behavioural_competency.connect.id } },
          })),
        },

        classifications: data.classifications
          ? {
              deleteMany: {}, // Clear existing classifications
              create: data.classifications.create.map((item) => ({
                classification: {
                  connect: { id: item.classification.connect.id },
                },
              })),
            }
          : { deleteMany: {} },

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
        education: data.education,
        job_experience: data.job_experience,
        professional_registration_requirements: data.professional_registration_requirements,
        optional_requirements: data.optional_requirements,
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

    await this.searchService.updateJobProfileSearchIndex(result.id);

    return result;
  }

  async duplicateJobProfile(jobProfileId: number, userId: string): Promise<number> {
    const jobProfileToDuplicate = await this.prisma.jobProfile.findUnique({
      where: { id: jobProfileId },
      include: {
        behavioural_competencies: {
          include: {
            behavioural_competency: true,
          },
        },
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
        reports_to: {
          include: {
            classification: true,
          },
        },
      },
    });

    if (!jobProfileToDuplicate) {
      throw AlexandriaError('Job Profile not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, role_id, role_type_id, scope_id, owner_id, title, ...jobProfileDataWithoutId } = jobProfileToDuplicate;

    // Modify fields that should be unique for the new record
    // Create a new JobProfileCreateInput object
    const newJobProfileData: JobProfileCreateInput = {
      // Spread the original job profile data
      ...jobProfileDataWithoutId,
      title: title + ' (Copy)',
      // Set the owner to the current user
      owner: { connect: { id: userId } },

      // Set the state to DRAFT or as per your requirement
      state: JobProfileState.DRAFT,

      // Generate a new unique number
      number: await this.getNextAvailableNumber(),

      // Map each relation
      behavioural_competencies: {
        create: jobProfileToDuplicate.behavioural_competencies.map((bc) => ({
          behavioural_competency: { connect: { id: bc.behavioural_competency_id } },
        })),
      },
      classifications: {
        create: jobProfileToDuplicate.classifications.map((cl) => ({
          classification: { connect: { id: cl.classification.id } },
        })),
      },
      jobFamilies: {
        create: jobProfileToDuplicate.jobFamilies.map((jf) => ({
          jobFamily: { connect: { id: jf.jobFamily.id } },
        })),
      },
      organizations: {
        create: jobProfileToDuplicate.organizations.map((org) => ({
          organization: { connect: { id: org.organization.id } },
        })),
      },
      scope: jobProfileToDuplicate.scope ? { connect: { id: jobProfileToDuplicate.scope.id } } : undefined,
      role: jobProfileToDuplicate.role ? { connect: { id: jobProfileToDuplicate.role.id } } : undefined,
      role_type: jobProfileToDuplicate.role_type ? { connect: { id: jobProfileToDuplicate.role_type.id } } : undefined,
      streams: {
        create: jobProfileToDuplicate.streams.map((s) => ({
          stream: { connect: { id: s.stream.id } },
        })),
      },
      reports_to: {
        create: jobProfileToDuplicate.reports_to.map((rt) => ({
          classification: { connect: { id: rt.classification.id } },
        })),
      },
      context: { create: { description: jobProfileToDuplicate.context.description } },
    };

    const newJobProfile = await this.prisma.jobProfile.create({
      data: newJobProfileData as any as Prisma.JobProfileCreateInput, // To prevent Excessive Stack Depth error
    });

    return newJobProfile.id;
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

    // console.log('jobProfiles: ', jobProfiles);

    // Flatten the array of organizations and deduplicate
    const allOrganizations = jobProfiles.flatMap((profile) => profile.organizations.map((o) => o.organization));
    // console.log('allOrganizations: ', allOrganizations);
    const uniqueOrganizations = Array.from(new Map(allOrganizations.map((org) => [org['id'], org])).values());

    return uniqueOrganizations;
  }

  async getJobProfilesDraftsClassifications() {
    const jobProfiles = await this.prisma.jobProfile.findMany({
      where: { state: 'DRAFT' },
      include: {
        classifications: {
          include: {
            classification: true,
          },
        },
      },
    });

    // Flatten the array of organizations and deduplicate
    const allClassifications = jobProfiles.flatMap((profile) => profile.classifications.map((o) => o.classification));
    const uniqueClassifications = Array.from(new Map(allClassifications.map((org) => [org['id'], org])).values());

    return uniqueClassifications;
  }

  async getJobProfilesClassifications() {
    const jobProfiles = await this.prisma.jobProfile.findMany({
      where: { state: 'PUBLISHED' },
      include: {
        classifications: {
          include: {
            classification: true,
          },
        },
      },
    });

    // Flatten the array of organizations and deduplicate
    const allClassifications = jobProfiles.flatMap((profile) => profile.classifications.map((o) => o.classification));
    const uniqueClassifications = Array.from(new Map(allClassifications.map((org) => [org['id'], org])).values());

    return uniqueClassifications;
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
