/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { JobProfile, JobProfileState, JobProfileType, Prisma } from '@prisma/client';
import { JobProfileCreateInput } from '../../@generated/prisma-nestjs-graphql';
import { PrismaService } from '../../modules/prisma/prisma.service';
import { AlexandriaError } from '../../utils/alexandria-error';
import { SearchService } from '../search/search.service';
import { FindManyJobProfileWithSearch } from './args/find-many-job-profile-with-search.args';

@Injectable()
export class JobProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly searchService: SearchService,
  ) {}

  private async getJobProfilesWithSearch(
    search: string,
    where: any,
    args: any,
    state: string = 'PUBLISHED',
    searchConditions?: any,
    include_archived = false,
  ) {
    // if searchConditions were provided, do a "dumb" search instead of elastic search
    let searchResultIds = null;
    if (!searchConditions) searchResultIds = search != null ? await this.searchService.searchJobProfiles(search) : null;

    return this.prisma.jobProfile.findMany({
      where: {
        is_archived: include_archived,
        ...(searchResultIds != null && { id: { in: searchResultIds } }),
        // ...(owner_id != null && { owner_id }),
        ...(searchConditions != null && searchConditions),
        state,
        ...where,
      },
      ...args,
      orderBy: [...(args.orderBy || []), { title: 'asc' }],
      include: {
        owner: true,
        published_by: true,
        updated_by: true,
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
        scopes: {
          include: {
            scope: true,
          },
        },
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

  private getDraftSearchConditions(search: string) {
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
      // null,
      this.getDraftSearchConditions(search),
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

  async getJobProfilesArchived(
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
      // null,
      this.getDraftSearchConditions(search),
      true,
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

  async getPageNumberForSelectProfile({
    search,
    where,
    sortByClassificationName,
    sortByJobFamily,
    sortByOrganization,
    sortOrder,
    selectProfile,
    ...args
  }: FindManyJobProfileWithSearch) {
    if (selectProfile) {
      // Fetch all job profiles based on the search and where conditions
      const allJobProfiles = await this.getJobProfilesWithSearch(search, this.transofrmWhereForAllOrgs(where), {
        ...args,
        take: undefined,
        skip: undefined,
      });

      // Sort the job profiles based on the provided sorting parameters
      const sortedJobProfiles = this.sortJobProfiles(
        allJobProfiles,
        sortByClassificationName,
        sortByJobFamily,
        sortByOrganization,
        sortOrder,
      );

      // Find the index of the selected profile within the sorted job profiles

      const selectedProfileIndex = (sortedJobProfiles as any[]).findIndex(
        (profile) => profile.number === parseInt(selectProfile),
      );

      if (selectedProfileIndex !== -1) {
        // Calculate the page number based on the selected profile index and take value
        const pageNumber = Math.ceil((selectedProfileIndex + 1) / args.take);
        return pageNumber;
      }
    }
    return -1;
  }

  private transofrmWhereForAllOrgs(where: any) {
    // example of where:
    // {"AND":[{"reports_to":{"some":{"classification_id":{"in":["185005"]}}}},{"organizations":{"some":{"organization_id":{"in":["BC026","ALL"]}}}}]}
    // Check if "ALL" is present in the organization_id array
    const hasAllOrganization = where?.AND?.some(
      (condition) => condition.organizations?.some?.organization_id?.in?.includes('ALL'),
    );

    // Modify the where query if "ALL" is present
    // Transform above where statement by including all_organizations: true by transforming into this:
    // {"AND":[{"reports_to":{"some":{"classification_id":{"in":["185005"]}}}},{"OR":[{"all_organizations":{"equals":true}},{"organizations":{"some":{"organization_id":{"in":["BC026"]}}}}]}]}
    if (hasAllOrganization) {
      where.AND = where.AND.map((condition) => {
        if (condition.organizations?.some?.organization_id?.in?.includes('ALL')) {
          const organizationIdIn = condition.organizations.some.organization_id.in.filter((id) => id !== 'ALL');
          const updatedCondition = {
            ...condition,
            OR: [
              { all_organizations: { equals: true } },
              {
                organizations: {
                  some: {
                    organization_id: {
                      in: organizationIdIn,
                    },
                  },
                },
              },
            ],
          };
          delete updatedCondition.organizations;
          return updatedCondition;
        }
        return condition;
      });
    }

    return where;
  }

  async getJobProfiles({
    search,
    where,
    sortByClassificationName,
    sortByJobFamily,
    sortByOrganization,
    sortOrder,
    selectProfile,
    ...args
  }: FindManyJobProfileWithSearch) {
    let jobProfiles: any[];

    where = this.transofrmWhereForAllOrgs(where);

    // if we are selecting a specific profile, we need to adjust page
    // used for when user presses back from the edit page and we need to select previously selected profile
    // on correct page
    if (selectProfile) {
      // Fetch all job profiles based on the search and where conditions
      const allJobProfiles = await this.getJobProfilesWithSearch(search, where, {
        ...args,
        take: undefined,
        skip: undefined,
      });

      // Sort the job profiles based on the provided sorting parameters
      const sortedJobProfiles = this.sortJobProfiles(
        allJobProfiles,
        sortByClassificationName,
        sortByJobFamily,
        sortByOrganization,
        sortOrder,
      );

      // Find the index of the selected profile within the sorted job profiles
      const selectedProfileIndex = (sortedJobProfiles as any[]).findIndex((profile) => {
        return profile.number === parseInt(selectProfile);
      });

      if (selectedProfileIndex !== -1) {
        // Calculate the page number based on the selected profile index and take value
        const pageNumber = Math.ceil((selectedProfileIndex + 1) / args.take);

        // Calculate the new skip value based on the page number and take value
        const newSkip = (pageNumber - 1) * args.take;

        // Fetch the job profiles for the calculated page
        jobProfiles = await this.getJobProfilesWithSearch(search, where, { ...args, skip: newSkip });
      } else {
        // If the selected profile is not found, return an empty array
        jobProfiles = [];
      }
    } else {
      // If selectProfile is not provided, fetch profiles based on the search and where conditions
      jobProfiles = await this.getJobProfilesWithSearch(search, where, args);
    }

    return jobProfiles;
  }

  private sortJobProfiles(
    jobProfiles: any[],
    sortByClassificationName: boolean,
    sortByJobFamily: boolean,
    sortByOrganization: boolean,
    sortOrder: string,
  ) {
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

  private async getJobProfilesCount(search: string, where: any) {
    const searchResultIds = search != null ? await this.searchService.searchJobProfiles(search) : null;

    return this.prisma.jobProfile.count({
      where: {
        ...(searchResultIds != null && { id: { in: searchResultIds } }),
        ...where,
      },
    });
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

  async getJobProfile(id: number, userRoles: string[] = []) {
    const jobProfile = await this.prisma.jobProfile.findUnique({
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
        scopes: {
          include: {
            scope: true,
          },
        },
        role: true,
        role_type: true,
        streams: {
          include: {
            stream: true,
          },
        },
        context: true,
        behavioural_competencies: {
          include: {
            behavioural_competency: true,
          },
        },
      },
    });

    // if profile is not published and user is not total compensation, deny access
    if (jobProfile.state !== 'PUBLISHED' && !userRoles.includes('total-compensation')) {
      throw AlexandriaError('You do not have permission to view this job profile');
    }
    return jobProfile;
  }

  async getJobProfileByNumber(number: number, userRoles: string[] = []) {
    const jobProfile = await this.prisma.jobProfile.findUnique({
      where: { number },
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
        scopes: {
          include: {
            scope: true,
          },
        },
        role: true,
        role_type: true,
        streams: {
          include: {
            stream: true,
          },
        },
        context: true,
        behavioural_competencies: {
          include: {
            behavioural_competency: true,
          },
        },
      },
    });
    // if profile is not published and user is not total compensation, deny access
    if (jobProfile.state !== 'PUBLISHED' && !userRoles.includes('total-compensation')) {
      throw AlexandriaError('You do not have permission to view this job profile');
    }
    return jobProfile;
  }

  async getJobProfileCount({ search, where }: FindManyJobProfileWithSearch) {
    const searchResultIds = search != null ? await this.searchService.searchJobProfiles(search) : null;

    return await this.prisma.jobProfile.count({
      where: {
        ...(searchResultIds != null && { id: { in: searchResultIds } }),
        // stream: { notIn: ['USER'] },
        state: 'PUBLISHED',
        ...this.transofrmWhereForAllOrgs(where),
      },
    });
  }

  async getJobProfilesDraftsCount({ search, where }: FindManyJobProfileWithSearch, userId: string) {
    // const searchResultIds = search != null ? await this.searchService.searchJobProfiles(search) : null;
    const searchConditions = this.getDraftSearchConditions(search);

    return await this.prisma.jobProfile.count({
      where: {
        is_archived: false,
        ...searchConditions,
        // ...(searchResultIds != null && { id: { in: searchResultIds } }),
        // stream: { notIn: ['USER'] },
        // owner_id: userId,
        state: 'DRAFT',
        ...where,
      },
    });
  }

  async getJobProfilesArchivedCount({ search, where }: FindManyJobProfileWithSearch, userId: string) {
    // const searchResultIds = search != null ? await this.searchService.searchJobProfiles(search) : null;
    const searchConditions = this.getDraftSearchConditions(search);

    return await this.prisma.jobProfile.count({
      where: {
        is_archived: true,
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
        is_archived: false,
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
    const jobProfileState = data.state ? data.state : JobProfileState.DRAFT;
    const updatedBy = jobProfileState === 'DRAFT' ? userId : null;
    const publishedBy = jobProfileState === 'PUBLISHED' ? userId : null;
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

        ...(data.scopes && {
          scopes: {
            create: data.scopes.create.map((item) => ({
              scope: {
                connect: { id: item.scope.connect.id },
              },
            })),
          },
        }),
        state: jobProfileState,
        type: data.organizations.create.length > 0 ? JobProfileType.MINISTRY : JobProfileType.CORPORATE, // should be MINISTRY if ministries provided, otherwise corporate
        published_by: publishedBy ? { connect: { id: publishedBy } } : undefined,
        updated_by: updatedBy ? { connect: { id: updatedBy } } : undefined,
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

        ...(data.state && { state: jobProfileState }),

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

        ...(data.scopes && {
          scopes: {
            deleteMany: {},
            create: data.scopes.create.map((item) => ({
              scope: { connect: { id: item.scope.connect.id } },
            })),
          },
        }),
        published_by: publishedBy ? { connect: { id: publishedBy } } : undefined,
        updated_by: updatedBy ? { connect: { id: updatedBy } } : undefined,
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

  async updateJobProfileState(jobProfileId: number, jobProfileState: string, userId: string) {
    const updatedBy = jobProfileState === 'DRAFT' ? userId : null;
    const publishedBy = jobProfileState === 'PUBLISHED' ? userId : null;
    await this.prisma.jobProfile.update({
      where: { id: jobProfileId || -1 },
      data: {
        state: jobProfileState as JobProfileState,
        published_by: publishedBy ? { connect: { id: publishedBy } } : undefined,
        updated_by: updatedBy ? { connect: { id: updatedBy } } : undefined,
      },
    });
    return true;
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
        scopes: {
          include: {
            scope: true,
          },
        },
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
    const {
      id,
      role_id,
      role_type_id,
      scopes,
      owner_id,
      updated_by_id,
      published_by_id,
      title,
      ...jobProfileDataWithoutId
    } = jobProfileToDuplicate;

    // Modify fields that should be unique for the new record
    // Create a new JobProfileCreateInput object
    const newJobProfileData: JobProfileCreateInput = {
      // Spread the original job profile data
      ...jobProfileDataWithoutId,
      title: title + ' (Copy)',
      // Set the updated_by to the current user
      owner: {
        connect: { id: userId },
      },
      updated_by: { connect: { id: userId } },
      published_by: jobProfileToDuplicate.published_by_id
        ? { connect: { id: jobProfileToDuplicate.published_by_id } }
        : undefined,

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
      scopes: {
        create: jobProfileToDuplicate.scopes.map((rt) => ({
          scope: { connect: { id: rt.scope_id } },
        })),
      },
      //jobProfileToDuplicate.scope ? { connect: { id: jobProfileToDuplicate.scope.id } } : undefined,
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

  async unarchiveJobProfile(jobProfileId: number, userId: string): Promise<number> {
    const jobProfile = await this.prisma.jobProfile.findUnique({
      where: { id: jobProfileId },
    });

    if (!jobProfile) {
      throw AlexandriaError('Job Profile not found');
    }

    if (!jobProfile.is_archived) {
      throw AlexandriaError('Job Profile is not archived');
    }

    await this.prisma.jobProfile.update({
      where: { id: jobProfileId },
      data: {
        is_archived: false,
      },
    });

    return jobProfileId;
  }

  async deleteJobProfile(jobProfileId: number, userId: string): Promise<number> {
    const jobProfile = await this.prisma.jobProfile.findUnique({
      where: { id: jobProfileId },
      include: {
        position_request: true,
      },
    });

    if (!jobProfile) {
      throw AlexandriaError('Job Profile not found');
    }

    if (jobProfile.state !== JobProfileState.DRAFT) {
      throw AlexandriaError('Only job profiles in DRAFT state can be deleted');
    }

    if (jobProfile.position_request.length > 0) {
      // If the job profile has links to PositionRequests, mark it as archived
      await this.prisma.jobProfile.update({
        where: { id: jobProfileId },
        data: {
          is_archived: true,
        },
      });
    } else {
      // If the job profile does not have links to PositionRequests, delete it along with related entities
      await this.prisma.$transaction([
        this.prisma.jobProfileBehaviouralCompetency.deleteMany({
          where: { job_profile_id: jobProfileId },
        }),
        this.prisma.jobProfileClassification.deleteMany({
          where: { job_profile_id: jobProfileId },
        }),
        this.prisma.jobProfileOrganization.deleteMany({
          where: { job_profile_id: jobProfileId },
        }),
        this.prisma.jobProfileJobFamilyLink.deleteMany({
          where: { jobProfileId: jobProfileId },
        }),
        this.prisma.jobProfileStreamLink.deleteMany({
          where: { jobProfileId: jobProfileId },
        }),
        this.prisma.jobProfileContext.deleteMany({
          where: { job_profile_id: jobProfileId },
        }),
        this.prisma.jobProfileReportsTo.deleteMany({
          where: { job_profile_id: jobProfileId },
        }),
        this.prisma.jobProfileScopeLink.deleteMany({
          where: { job_profile_id: jobProfileId },
        }),
        this.prisma.jobProfile.delete({
          where: { id: jobProfileId },
        }),
      ]);
    }

    return jobProfileId;
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

  async getJobProfilesMinistries(positionRequestId?: number) {
    // if position request id is included, we need to construct a where statement that filters
    // job profiles for that position request
    if (positionRequestId) {
      // todo: see comment below
      // const positionRequest = await this.prisma.positionRequest.findUnique({
      //   where: { id: positionRequestId },
      // });
      // // ger organization in which this position is being created
      // const department = await this.prisma.department.findUnique({
      //   where: { id: positionRequest.department_id },
      // });
      // const organization = await this.prisma.organization.findUnique({
      //   where: { id: department.organization_id },
      // });
      // // find classification for the position to which the new position will report to
      // const r = positionRequest.reports_to_position_id;
      // // todo: would need to call peoplesoft API here,
      // // need to do this for all filters, so is not efficient
      // // find a way to save classification info somewhere?
      // // generate a statement like this:
      // // {"AND":[{"reports_to":{"some":{"classification_id":{"in":["185005"]}}}},{"organizations":{"some":{"organization_id":{"in":["BC026","ALL"]}}}}]}
    }

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
      where: {
        is_archived: false,
        state: 'DRAFT',
      },
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
