/* eslint-disable @typescript-eslint/no-unused-vars */
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { JobProfile, JobProfileState, JobProfileType, Prisma } from '@prisma/client';
import { Cache } from 'cache-manager';
import { JobProfileCreateInput } from '../../@generated/prisma-nestjs-graphql';
import { PrismaService } from '../../modules/prisma/prisma.service';
import { AlexandriaError } from '../../utils/alexandria-error';
import { SearchService } from '../search/search.service';
import { FindManyJobProfileWithSearch } from './args/find-many-job-profile-with-search.args';
import { ClassificationInput } from './inputs/classification-requirements.inputs';
import { ExtendedJobProfileCreateInput } from './inputs/extended-job-profile-create.input';
@Injectable()
export class JobProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly searchService: SearchService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private async getJobProfilesWithSearch(
    search: string,
    where: any,
    args: any,
    state: string = 'PUBLISHED',
    searchConditions?: any,
    include_archived = false,
    excludedDepartment?: boolean,
  ) {
    // if searchConditions were provided, do a "dumb" search instead of elastic search
    let searchResultIds = null;
    // console.log('searchConditions: ', searchConditions, search);
    if (!searchConditions) searchResultIds = search != null ? await this.searchService.searchJobProfiles(search) : null;

    const currentJobProfiles =
      state == 'PUBLISHED'
        ? await this.prisma.currentJobProfile.findMany({
            select: { id: true, version: true },
            where: { ...(searchResultIds != null && { id: { in: searchResultIds } }) },
          })
        : undefined;

    // console.log(
    //   'currentJobProfiles: ',
    //   JSON.stringify(
    //     currentJobProfiles.map((profile) => {
    //       return profile.id;
    //     }),
    //   ),
    // );

    // console.log('where arg: ', where);
    // console.log('args: ', args);

    return this.prisma.jobProfile.findMany({
      where: {
        is_archived: include_archived,
        // ...(searchResultIds != null && { id: { in: searchResultIds } }),
        ...(currentJobProfiles && {
          OR: currentJobProfiles.map((record) => ({
            id: record.id,
            version: record.version,
          })),
        }),
        // ...(owner_id != null && { owner_id }),
        ...(searchConditions != null && searchConditions),
        state,
        ...where,
        classifications:
          excludedDepartment !== undefined
            ? {
                some: excludedDepartment
                  ? {
                      classification: {
                        NOT: { employee_group_id: 'GEU' },
                      },
                    }
                  : {
                      classification: {
                        NOT: { employee_group_id: 'OEX' },
                      },
                    },
              }
            : undefined,
      },
      ...args,
      // profiles may have same titles, so we need to sort by title and id
      // otherwise, the order of profiles may change between requests
      // when paginating
      orderBy: [...(args.orderBy || []), { title: 'asc' }, { id: 'asc' }],
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
    departmentId,
    ...args
  }: FindManyJobProfileWithSearch) {
    const department =
      departmentId != null
        ? await this.prisma.department.findUnique({
            where: { id: departmentId },
            include: {
              metadata: true,
            },
          })
        : undefined;

    if (selectProfile) {
      // Fetch all job profiles based on the search and where conditions

      // Fetch all job profiles based on the search and where conditions
      const allJobProfiles = await this.getJobProfilesWithSearch(
        search,
        this.transformWhereForAllOrgs(where),
        {
          ...args,
          take: undefined,
          skip: undefined,
        },
        undefined,
        undefined,
        undefined,
        department?.metadata.is_statutorily_excluded,
      );

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

  private transformWhereForAllOrgs(where: any) {
    // example of where:
    // {"AND":[{"reports_to":{"some":{"classification_id":{"in":["185005"]}}}},{"organizations":{"some":{"organization_id":{"in":["BC026","ALL"]}}}}]}
    // Check if "ALL" is present in the organization_id array
    const hasAllOrganization = where?.AND?.some((condition) =>
      condition.organizations?.some?.organization_id?.in?.includes('ALL'),
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
    departmentId,
    ...args
  }: FindManyJobProfileWithSearch) {
    let jobProfiles: any[];

    where = this.transformWhereForAllOrgs(where);

    // if we are selecting a specific profile, we need to adjust page
    // used for when user presses back from the edit page and we need to select previously selected profile
    // on correct page
    const department =
      departmentId != null
        ? await this.prisma.department.findUnique({
            where: { id: departmentId },
            include: {
              metadata: true,
            },
          })
        : undefined;
    if (selectProfile) {
      // Fetch all job profiles based on the search and where conditions
      const allJobProfiles = await this.getJobProfilesWithSearch(
        search,
        where,
        {
          ...args,
          take: undefined,
          skip: undefined,
        },
        undefined,
        undefined,
        undefined,
        department?.metadata.is_statutorily_excluded,
      );

      // output all profiles ids:
      // allJobProfiles is an array

      // Sort the job profiles based on the provided sorting parameters
      const sortedJobProfiles = await this.sortJobProfiles(
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
        jobProfiles = await this.getJobProfilesWithSearch(
          search,
          where,
          { ...args, skip: newSkip },
          undefined,
          undefined,
          undefined,
          department?.metadata.is_statutorily_excluded,
        );
      } else {
        // If the selected profile is not found, return an empty array
        jobProfiles = [];
      }
    } else {
      // If selectProfile is not provided, fetch profiles based on the search and where conditions
      jobProfiles = await this.getJobProfilesWithSearch(
        search,
        where,
        args,
        undefined,
        undefined,
        undefined,
        department?.metadata.is_statutorily_excluded,
      );
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

  private async sortJobProfilesByClassification(jobProfiles: JobProfile[], sortOrder: string): Promise<JobProfile[]> {
    const firstClassificationNameMap = new Map<number, string>();

    for (const profile of jobProfiles) {
      const classifications = await this.prisma.jobProfileClassification.findMany({
        where: { job_profile_id: profile.id, job_profile_version: profile.version },
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
        where: { jobProfileId: profile.id, jobProfileVersion: profile.version },
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
        where: { job_profile_id: profile.id, job_profile_version: profile.version },
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

  async getJobProfile(id: number, version: number, userRoles: string[] = []) {
    const maxVersion =
      version ??
      (
        await this.prisma.jobProfile.groupBy({
          where: { id: id },
          by: ['id'],
          _max: {
            version: true,
          },
        })
      )[0]?._max?.version;

    if (maxVersion == null) return null;
    const jobProfile = await this.prisma.jobProfile.findUnique({
      where: { id_version: { id, version: maxVersion } },
      include: {
        owner: true,
        updated_by: true,
        published_by: true,
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

        behavioural_competencies: {
          include: {
            behavioural_competency: true,
          },
        },
      },
    });
    // : await this.prisma.currentJobProfile.findUnique({
    //     where: { id },
    //     include: {
    //       owner: true,
    //       updated_by: true,
    //       published_by: true,
    //       classifications: {
    //         include: {
    //           classification: true,
    //         },
    //       },
    //       jobFamilies: {
    //         include: {
    //           jobFamily: true,
    //         },
    //       },
    //       organizations: {
    //         include: {
    //           organization: true,
    //         },
    //       },
    //       scopes: {
    //         include: {
    //           scope: true,
    //         },
    //       },
    //       role: true,
    //       role_type: true,
    //       streams: {
    //         include: {
    //           stream: true,
    //         },
    //       },

    //       behavioural_competencies: {
    //         include: {
    //           behavioural_competency: true,
    //         },
    //       },
    //     },
    //   });

    // if profile is not published and user is not total compensation, deny access
    if (jobProfile?.state !== 'PUBLISHED' && !userRoles.includes('total-compensation')) {
      throw AlexandriaError('You do not have permission to view this job profile');
    }
    return jobProfile;
  }

  async getJobProfileByNumber(number: number, userRoles: string[] = []) {
    // since number is not necessarily unique on the job profiles model,
    // we get the latest

    const currentJobProfiles = await this.prisma.currentJobProfile.findMany({
      where: { number },
      orderBy: { published_at: 'desc' },
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

        behavioural_competencies: {
          include: {
            behavioural_competency: true,
          },
        },
      },
    });
    if (currentJobProfiles.length > 1) {
      throw AlexandriaError('More than one job profile found for job number ' + number + '. Please contact support.');
    }
    const jobProfile = currentJobProfiles[0];
    // if profile is not published and user is not total compensation, deny access
    if (jobProfile && jobProfile?.state !== 'PUBLISHED' && !userRoles.includes('total-compensation')) {
      throw AlexandriaError('You do not have permission to view this job profile');
    }
    return jobProfile;
  }

  async getJobProfileCount({ search, where, departmentId }: FindManyJobProfileWithSearch) {
    const department =
      departmentId != null
        ? await this.prisma.department.findUnique({
            where: { id: departmentId },
            include: {
              metadata: true,
            },
          })
        : undefined;
    const excludedDepartment = department?.metadata?.is_statutorily_excluded;
    const searchResultIds = search != null ? await this.searchService.searchJobProfiles(search) : null;

    return await this.prisma.currentJobProfile.count({
      where: {
        ...(searchResultIds != null && { id: { in: searchResultIds } }),
        // stream: { notIn: ['USER'] },
        state: 'PUBLISHED',
        ...this.transformWhereForAllOrgs(where),
        classifications:
          excludedDepartment !== undefined
            ? {
                some: excludedDepartment
                  ? {
                      classification: {
                        NOT: { employee_group_id: 'GEU' },
                      },
                    }
                  : {
                      classification: {
                        NOT: { employee_group_id: 'OEX' },
                      },
                    },
              }
            : undefined,
      },
    });
  }

  async getJobProfileMeta(jobStoreId: number) {
    const jobProfiles = await this.prisma.jobProfile.findMany({
      where: {
        id: jobStoreId,
        state: 'PUBLISHED',
      },
      select: {
        id: true,
        version: true,
        updated_at: true,
        updated_by: true,
        created_at: true,
        owner: true,
        published_at: true,
        published_by: true,
        views: true,
      },
    });

    // Initialize variables for the aggregates
    let totalViews = 0;
    let firstPublishedByDate = null;
    let firstPublishedByUser = null;
    let firstCreatedByDate = null;
    let firstCreatedByOwner = null;
    const versions = [];

    // Process the job profiles
    jobProfiles.forEach((profile) => {
      // Sum of views
      totalViews += profile.views;

      // Check and set the first published by date and user
      if (!firstPublishedByDate || new Date(profile.published_at) < new Date(firstPublishedByDate)) {
        firstPublishedByDate = profile.published_at;
        firstPublishedByUser = profile.published_by?.name;
      }

      // Check and set the first created by date and owner
      if (!firstCreatedByDate || new Date(profile.created_at) < new Date(firstCreatedByDate)) {
        firstCreatedByDate = profile.created_at;
        firstCreatedByOwner = profile.owner?.name;
      }

      // Collect all versions with id and version
      versions.push({ id: profile.id, version: profile.version });
    });

    // Return the aggregated result
    return {
      totalViews,
      firstPublishedBy: {
        date: firstPublishedByDate,
        user: firstPublishedByUser,
      },
      firstCreatedBy: {
        date: firstCreatedByDate,
        owner: firstCreatedByOwner,
      },
      versions,
    };
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

  async getBehaviouralCompetencies(job_profile_id: number, job_profile_version: number) {
    return this.prisma.jobProfileBehaviouralCompetency.findMany({
      where: { job_profile_id, job_profile_version },
      include: {
        behavioural_competency: true,
      },
    });
  }

  async createOrUpdateJobProfile(data: ExtendedJobProfileCreateInput, userId: string) {
    // todo: catch the "number" constraint failure and process the error on the client appropriately
    const jobProfileState = data.state ? data.state : JobProfileState.DRAFT;

    // if the id is 0, we have set this on the client to indicate a new record. Autoincrement is not set so
    // find the max id and increment.
    const sorted = (await this.prisma.jobProfile.findMany({ select: { id: true } })).sort((a, b) => b.id - a.id);
    const id = data.id == 0 ? sorted[0].id + 1 : data.id;
    const currentJobProfile = await this.prisma.currentJobProfile.findUnique({ where: { id: data.id } });
    const profileIsUsed =
      data.version > 0 &&
      (await this.prisma.positionRequest.findFirst({
        where: {
          AND: [
            {
              parent_job_profile_id: {
                equals: id,
              },
            },
            {
              parent_job_profile_version: {
                equals: data.version,
              },
            },
          ],
        },
      }));

    // only set owner (created_by) if this is a new record, ie. new draft or new version of a published profile
    let owner;
    // only set publishedBy if we are publishing a draft or new version of a published profile, ie. a new published record
    let publishedBy;
    let publishedAt;
    let version;
    if (data.id == id) {
      if (profileIsUsed || currentJobProfile.version > data.version) {
        //we are publishing a new version.
        owner = userId;
        publishedBy = jobProfileState === 'PUBLISHED' ? userId : data.published_by.connect.id;
        publishedAt = jobProfileState === 'PUBLISHED' ? new Date(Date.now()) : data.published_at;
        version = currentJobProfile.version + 1;
      } else {
        // we are updating a record. - DRAFT or PUBLISHED
        owner = data.owner.connect.id;
        const previousState = (
          await this.prisma.jobProfile.findUnique({
            where: {
              id_version: {
                id: id ?? -1,
                version: data.version ?? -1,
              },
            },
          })
        ).state;
        // if the existing record is not published, the published by should be null. otherwise, set it to previous value.
        publishedBy =
          jobProfileState != 'PUBLISHED'
            ? undefined
            : previousState === 'DRAFT'
              ? userId
              : data.published_by.connect.id;
        publishedAt =
          jobProfileState != 'PUBLISHED'
            ? undefined
            : previousState === 'DRAFT'
              ? new Date(Date.now())
              : data.published_at;
        version = data.version;
      }
    } else {
      //we are creating a new job profile.
      owner = userId;
      publishedBy = jobProfileState === 'PUBLISHED' ? userId : data.published_by.connect.id;
      publishedAt = jobProfileState === 'PUBLISHED' ? new Date(Date.now()) : data.published_at;
      version = 1;
    }

    // always set updatedBy to current user
    const updatedBy = userId;

    // check that none of the current profiles already have this jobstore number
    const existingProfiles = await this.prisma.currentJobProfile.count({
      where: {
        ...(data.id !== 0 && {
          // only add the NOT condition if we're updating an existing profile
          NOT: {
            id: id,
          },
        }),
        number: data.number,
        state: 'PUBLISHED',
      },
    });

    if (existingProfiles > 0) {
      throw AlexandriaError('A job profile with this number already exists');
    }

    // //for net new profile creation - we increment in the create statement
    // const doesExist = await this.prisma.jobProfile.findUnique({
    //   // if the profile has been used, that means it has been published at some point and linked to a PR.
    //   // We must create a new profile version in this case.
    //   // if it has an id but it has not been used, regardless of state, we can simply update the existing record.
    //   where: {
    //     id_version: { id: id, version: version },
    //   },
    // });

    // console.log('doesExist ', doesExist);
    const result = await this.prisma.jobProfile.upsert({
      // if the profile has been used, that means it has been published at some point and linked to a PR.
      // We must create a new profile version in this case.
      // if it has an id but it has not been used, regardless of state, we can simply update the existing record.
      where: {
        id_version: { id: id, version: version },
      },
      create: {
        id: id,
        version: version,
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
                connect: {
                  id_employee_group_id_peoplesoft_id: item.classification.connect.id_employee_group_id_peoplesoft_id,
                },
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
        context: data.context,

        ...(data.role && {
          role: {
            connect: { id: data.role.connect.id },
          },
        }),
        role_type: {
          connect: { id: data.role_type.connect.id },
        },
        // ...(data.role && {
        //   role_id: data.role.connect.id,
        // }),
        // ...(data.role_type && {
        //   role_type_id: data.role_type.connect.id,
        // }),

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
        ...(owner && { owner: { connect: { id: owner } } }),
        published_by: publishedBy ? { connect: { id: publishedBy } } : undefined,
        published_at: publishedAt,
        updated_by: updatedBy ? { connect: { id: updatedBy } } : undefined,
        valid_from: new Date(Date.now()),
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
              connect: {
                id_employee_group_id_peoplesoft_id: item.classification.connect.id_employee_group_id_peoplesoft_id,
              },
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
                  connect: {
                    id_employee_group_id_peoplesoft_id: item.classification.connect.id_employee_group_id_peoplesoft_id,
                  },
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
        context: data.context,

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
        ...(owner && { owner: { connect: { id: owner } } }),
        published_by: publishedBy ? { connect: { id: publishedBy } } : undefined,
        published_at: publishedAt,
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
            classification: {
              connect: {
                id_employee_group_id_peoplesoft_id: item.classification.connect.id_employee_group_id_peoplesoft_id,
              },
            },
          })),
        },

        // Update miscellaneous data
        total_comp_create_form_misc: data.total_comp_create_form_misc,
      },
    });

    await this.searchService.updateJobProfileSearchIndex(result.id);

    return result;
  }

  async updateJobProfileViewCountCache(jobProfiles: number[]) {
    const jobProfileCounts: Map<number, number> =
      (await this.cacheManager.get('jobProfileCounts')) ?? new Map<number, number>();
    for (const id of jobProfiles) {
      if (jobProfileCounts.has(id)) {
        jobProfileCounts.set(id, jobProfileCounts.get(id) + 1);
      } else {
        jobProfileCounts.set(id, 1);
      }
    }

    await this.cacheManager.set('jobProfileCounts', jobProfileCounts, 20000);
    return jobProfileCounts.size;
  }

  async updateJobProfileState(
    jobProfileId: number,
    jobProfileVersion: number,
    jobProfileState: string,
    userId: string,
  ) {
    const updatedBy = jobProfileState === 'DRAFT' ? userId : null;
    const publishedBy = jobProfileState === 'PUBLISHED' ? userId : null;
    await this.prisma.jobProfile.update({
      where: { id_version: { id: jobProfileId || -1, version: jobProfileVersion || -1 } },
      data: {
        state: jobProfileState as JobProfileState,
        published_by: publishedBy ? { connect: { id: publishedBy } } : undefined,
        updated_by: updatedBy ? { connect: { id: updatedBy } } : undefined,
      },
    });
    return true;
  }

  async duplicateJobProfile(jobProfileId: number, jobProfileVersion: number, userId: string): Promise<number> {
    const maxId = await this.prisma.jobProfile.aggregate({
      _max: {
        id: true,
      },
    });
    const jobProfileToDuplicate = await this.prisma.jobProfile.findUnique({
      where: { id_version: { id: jobProfileId, version: jobProfileVersion } },
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
      version,
      is_archived,
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
      id: maxId._max.id + 1,
      version: 1,
      is_archived: false,
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
          classification: {
            connect: {
              id_employee_group_id_peoplesoft_id: {
                id: cl.classification.id,
                employee_group_id: cl.classification.employee_group_id,
                peoplesoft_id: cl.classification.peoplesoft_id,
              },
            },
          },
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
          classification: {
            connect: {
              id_employee_group_id_peoplesoft_id: {
                id: rt.classification.id,
                employee_group_id: rt.classification.employee_group_id,
                peoplesoft_id: rt.classification.peoplesoft_id,
              },
            },
          },
        })),
      },
      context: jobProfileToDuplicate.context,
    };

    const newJobProfile = await this.prisma.jobProfile.create({
      data: newJobProfileData as any as Prisma.JobProfileCreateInput, // To prevent Excessive Stack Depth error
    });

    return newJobProfile.id;
  }

  async unarchiveJobProfile(jobProfileId: number, userId: string): Promise<number> {
    const jobProfiles = await this.prisma.jobProfile.findMany({
      where: { id: jobProfileId },
      include: {
        position_request: true,
      },
    });

    if (!jobProfiles) {
      throw AlexandriaError('Job Profile not found');
    }
    const currentJobProfile = jobProfiles.sort((a, b) => b.version - a.version)[0];

    if (!currentJobProfile) {
      throw AlexandriaError('Job Profile not found');
    }

    if (!currentJobProfile.is_archived) {
      throw AlexandriaError('Job Profile is not archived');
    }

    await this.prisma.jobProfile.update({
      where: { id_version: { id: jobProfileId, version: currentJobProfile.version } },
      data: {
        is_archived: false,
      },
    });

    return jobProfileId;
  }

  async deleteJobProfile(jobProfileId: number, userId: string): Promise<number> {
    const jobProfiles = await this.prisma.jobProfile.findMany({
      where: { id: jobProfileId },
      include: {
        position_request: true,
      },
    });

    if (!jobProfiles) {
      throw AlexandriaError('Job Profile not found');
    }
    const currentJobProfile = jobProfiles.sort((a, b) => b.version - a.version)[0];
    if (currentJobProfile.state !== JobProfileState.DRAFT) {
      throw AlexandriaError('Only job profiles in DRAFT state can be deleted');
    }
    const anyPositionRequests = jobProfiles.find((jp) => jp.position_request.length > 0);
    if (anyPositionRequests) {
      // If the job profile has links to PositionRequests, mark it as archived
      await this.prisma.jobProfile.update({
        where: { id_version: { id: jobProfileId, version: currentJobProfile.version } },
        data: {
          is_archived: true,
        },
      });
    } else {
      if (!anyPositionRequests) {
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
          this.prisma.jobProfileReportsTo.deleteMany({
            where: { job_profile_id: jobProfileId },
          }),
          this.prisma.jobProfileScopeLink.deleteMany({
            where: { job_profile_id: jobProfileId },
          }),
          this.prisma.jobProfile.deleteMany({
            where: { id: jobProfileId },
          }),
        ]);
      }
    }
    return jobProfileId;
  }

  async getReportsTo(job_profile_id: number, job_profile_version: number) {
    return this.prisma.jobProfileReportsTo.findMany({
      where: { job_profile_id, job_profile_version },
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

    const jobProfiles = await this.prisma.currentJobProfile.findMany({
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
    const uniqueClassifications = Array.from(
      new Map(
        allClassifications.map((classification) => {
          const { id, employee_group_id, peoplesoft_id } = classification;
          return [`${id}.${employee_group_id}.${peoplesoft_id}`, classification];
        }),
      ).values(),
    );

    return uniqueClassifications;
  }

  async getJobProfilesClassifications() {
    // Step 1: Get the maximum version for each job profile
    // const maxVersions = await this.prisma.jobProfile.groupBy({
    //   by: ['id'],
    //   _max: {
    //     version: true,
    //   },
    // });
    // const jobProfiles = await this.prisma.jobProfile.findMany({
    //   where: {
    //     state: 'PUBLISHED',
    //     AND: maxVersions.map((maxVersion) => ({
    //       id: maxVersion.id,
    //       version: maxVersion._max.version,
    //     })),
    //   },
    //   include: {
    //     classifications: {
    //       include: {
    //         classification: true,
    //       },
    //     },
    //   },
    // });

    const jobProfiles = await this.prisma.currentJobProfile.findMany({
      where: {
        state: 'PUBLISHED',
      },
      include: {
        classifications: {
          include: {
            classification: true,
          },
        },
      },
    });

    //doesnt work
    // const jobProfiles = await this.prisma.jobProfile.groupBy({
    //   by: ['id'],
    //   _max: {
    //     version: true,
    //   },
    //   where: {
    //     state: 'PUBLISHED',
    //   },
    //   include: {
    //     classifications: {
    //       include: {
    //         classification: true,
    //       },
    //     },
    //   },
    // });

    // const jobProfiles2 = await this.prisma.$queryRaw`
    // SELECT
    //   jp.id,
    //   MAX(jp.version) AS max_version,
    //       c.job_profile_id,
    //       c.classification_id
    // FROM
    //   job_profile jp
    // LEFT JOIN
    //   job_profile_classification c ON jp.id = c.job_profile_id
    // LEFT JOIN
    //   classification cl ON c.classification_id = cl.id
    // WHERE
    //   jp.state = 'PUBLISHED'
    // GROUP BY
    //   jp.id,c.job_profile_id,c.classification_id`;

    // console.log(jobProfiles2);

    // Flatten the array of organizations and deduplicate
    const allClassifications = jobProfiles.flatMap((profile) => profile.classifications.map((o) => o.classification));
    const uniqueClassifications = Array.from(
      new Map(
        allClassifications.map((classification) => {
          const { id, employee_group_id, peoplesoft_id } = classification;
          return [`${id}.${employee_group_id}.${peoplesoft_id}`, classification];
        }),
      ).values(),
    ).sort((a, b) => (a.name > b.name ? 1 : -1));

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

  async getRequirementsWithoutReadOnly(
    jobFamilyIds: number[],
    jobFamilyStreamIds: number[],
    classifications: ClassificationInput[],
    ministryIds?: string[],
    jobFamilyWithNoStream?: number[],
    excludeProfileId?: number,
    excludeProfileVersion?: number,
  ) {
    // get job profiles from which to draw the requirements from based on job family and stream
    let jobProfiles = await this.prisma.currentJobProfile.findMany({
      where: {
        AND: [
          { id: { not: excludeProfileId ?? -1 } },
          {
            OR: [
              {
                AND: [
                  {
                    jobFamilies: {
                      some: {
                        jobFamily: {
                          id: { in: jobFamilyIds },
                        },
                      },
                    },
                  },
                  {
                    streams: {
                      some: {
                        stream: {
                          id: { in: jobFamilyStreamIds },
                        },
                      },
                    },
                  },
                  {
                    state: 'PUBLISHED',
                    professional_registration_requirements: { not: null },
                  },
                ],
              },
              {
                AND: [
                  {
                    jobFamilies: {
                      some: {
                        jobFamily: {
                          id: { in: jobFamilyWithNoStream },
                        },
                      },
                    },
                  },
                  {
                    state: 'PUBLISHED',
                    professional_registration_requirements: { not: null },
                  },
                ],
              },
            ],
          },
        ],
      },
      select: {
        id: true,
        professional_registration_requirements: true,
        preferences: true,
        knowledge_skills_abilities: true,
        willingness_statements: true,
        jobFamilies: {
          select: {
            jobFamily: true,
          },
        },
        streams: {
          select: {
            stream: true,
          },
        },
      },
    });

    // filter job profiles by either matching job profile + stream criteria
    // or by looking at profiles that have family and no streams (jobFamilyWithNoStream)
    jobProfiles = jobProfiles.filter((profile) => {
      // Check if the profile matches jobFamilyWithNoStream criteria
      const matchesNoStreamCriteria =
        jobFamilyWithNoStream?.some(
          (familyId) =>
            profile.jobFamilies.some((jf) => jf.jobFamily.id === familyId) &&
            !profile.streams.some((s) => s.stream.job_family_id === familyId),
        ) ?? false;

      // Check if the profile matches jobFamilyIds and jobFamilyStreamIds criteria
      const matchesFamilyAndStreamCriteria =
        jobFamilyIds.some((familyId) => profile.jobFamilies.some((jf) => jf.jobFamily.id === familyId)) &&
        jobFamilyStreamIds.length != 0 &&
        jobFamilyStreamIds.some((streamId) => profile.streams.some((s) => s.stream.id === streamId));

      // Keep the profile if it matches either criteria
      return matchesNoStreamCriteria || matchesFamilyAndStreamCriteria;
    });

    // this will be the return value
    const securityScreeningMap = new Map<string, RequirementEntry>();
    const professionalRegistrationMap = new Map<string, RequirementEntry>();
    const preferencesMap = new Map<string, RequirementEntry>();
    const ksaMap = new Map<string, RequirementEntry>();
    const willingnessStatementsMap = new Map<string, RequirementEntry>();

    interface RequirementEntry {
      text: string;
      jobFamilies: { id: number }[];
      streams: { id: number }[];
      classification: { id: string; employee_group_id: string } | null;
      organization: { id: string } | null;
      tc_is_readonly: boolean;
    }

    // get professional registration requirements for auto-population based on classification and job family
    // professional registrations always have classifications but may or may not have job family id (null)
    let professionalRegistrationRequirements = await this.prisma.professionalRegistrationRequirement.findMany({
      where: {
        OR: [
          // Classification only (multiple)
          ...classifications.map((classification) => ({
            AND: [
              {
                classification_id: classification.id,
                classification_employee_group_id: classification.employee_group_id,
              },
              {
                job_family_id: null,
              },
            ],
          })),
          // Classification and job family (multiple)
          ...classifications.map((classification) => ({
            AND: [
              {
                classification_id: classification.id,
                classification_employee_group_id: classification.employee_group_id,
              },
              {
                job_family_id: { in: jobFamilyIds },
              },
            ],
          })),
        ],
      },
      include: {
        requirement: true,
      },
    });

    // if ministries were provided, select professional registrations from profiles with those ministries (with and without job family)
    if (ministryIds) {
      const professionalRegistrationRequirements2 = await this.prisma.professionalRegistrationRequirement.findMany({
        where: {
          OR: [
            ...classifications.map((classification) => ({
              AND: [
                {
                  classification_id: classification.id,
                  classification_employee_group_id: classification.employee_group_id,
                },
                {
                  job_family_id: null,
                },
                {
                  organization_id: { in: ministryIds },
                },
              ],
            })),
            ...classifications.map((classification) => ({
              AND: [
                {
                  classification_id: classification.id,
                  classification_employee_group_id: classification.employee_group_id,
                },
                {
                  job_family_id: { in: jobFamilyIds },
                },
                {
                  organization_id: { in: ministryIds },
                },
              ],
            })),
          ],
        },
        include: {
          requirement: true,
        },
      });

      // merge with initial job profiles and remove duplicates
      professionalRegistrationRequirements = [
        ...new Set([...professionalRegistrationRequirements, ...professionalRegistrationRequirements2]),
      ];
    }

    // Get security screenings by matching family/ministry
    const securityScreenings = await this.prisma.securityScreening.findMany({
      where: {
        OR: [
          {
            AND: [
              {
                organization_id: null,
              },
              {
                job_family_id: null,
              },
            ],
          },
          {
            AND: [
              {
                organization_id: null,
              },
              {
                job_family_id: { in: jobFamilyIds },
              },
            ],
          },
          {
            AND: [
              {
                organization_id: { in: ministryIds },
              },
              {
                job_family_id: { in: jobFamilyIds },
              },
            ],
          },
        ],
      },
      include: {
        screening: true,
      },
    });

    // build return for auto-populated requirements
    // we selected by job family and classification above, include the job family in response here, if applicable
    professionalRegistrationRequirements.forEach((registration) => {
      const text = registration.requirement.text;
      if (!professionalRegistrationMap.has(text)) {
        professionalRegistrationMap.set(text, {
          text,
          jobFamilies: registration.job_family_id ? [{ id: registration.job_family_id }] : [],
          streams: [],
          classification: registration.classification_id
            ? {
                id: registration.classification_id,
                employee_group_id: registration.classification_employee_group_id,
              }
            : null,
          organization: registration.organization_id ? { id: registration.organization_id } : null,
          tc_is_readonly: false,
        });
      } else {
        const entry = professionalRegistrationMap.get(text);
        if (registration.job_family_id && !entry.jobFamilies.some((jf) => jf.id === registration.job_family_id)) {
          entry.jobFamilies.push({ id: registration.job_family_id });
        }
      }
    });

    // build return for security screenings
    securityScreenings.forEach((screening) => {
      const text = screening.screening.text;
      if (!securityScreeningMap.has(text)) {
        securityScreeningMap.set(text, {
          text,
          jobFamilies: screening.job_family_id ? [{ id: screening.job_family_id }] : [],
          streams: [],
          classification: null,
          organization: screening.organization_id ? { id: screening.organization_id } : null,
          tc_is_readonly: false,
        });
      } else {
        const entry = securityScreeningMap.get(text);
        if (screening.job_family_id && !entry.jobFamilies.some((jf) => jf.id === screening.job_family_id)) {
          entry.jobFamilies.push({ id: screening.job_family_id });
        }
      }
    });

    // log securityScreeningMap
    // console.log('securityScreeningMap: ', JSON.stringify(Array.from(securityScreeningMap.entries()), null, 2));

    // filter out data that's identical to excluded profile

    let excludedProfile;
    if (excludeProfileId) {
      excludedProfile = await this.prisma.jobProfile.findUnique({
        where: { id_version: { id: excludeProfileId, version: excludeProfileVersion } },
        select: {
          professional_registration_requirements: true,
          preferences: true,
          knowledge_skills_abilities: true,
          willingness_statements: true,
          security_screenings: true,
        },
      });

      // const filterMap = (map: Map<string, RequirementEntry>, excludedFields: any[] | undefined) => {
      //   if (!excludedFields) return map;
      //   excludedFields.forEach((excludedField) => {
      //     const entry = map.get(excludedField.text);
      //     console.log('checking: ', excludedField, entry);
      //     // if the field is present in the excluded profile and is not custom, delete it
      //     if (entry && !excludedField.tc_is_readonly) {
      //       console.log('deleting: ', excludedField.text);
      //       map.delete(excludedField.text);
      //     }
      //   });
      //   return map;
      // };

      // professionalRegistrationMap = filterMap(
      //   professionalRegistrationMap,
      //   excludedProfile.professional_registration_requirements,
      // );
      // console.log('filtering security screenings: ', excludedProfile.security_screenings);
      // securityScreeningMap = filterMap(securityScreeningMap, excludedProfile.security_screenings);
      // console.log('after filter: ', JSON.stringify(Array.from(securityScreeningMap.entries()), null, 2));
      // preferencesMap = filterMap(preferencesMap, excludedProfile.preferences);
      // ksaMap = filterMap(ksaMap, excludedProfile.knowledge_skills_abilities);
      // willingnessStatementsMap = filterMap(willingnessStatementsMap, excludedProfile.willingness_statements);
    }

    // build return for pick list requirements from job family and stream
    jobProfiles.forEach((profile) => {
      processRequirements(
        (profile.professional_registration_requirements as any[]) || [],
        professionalRegistrationMap,
        profile,
        excludedProfile?.professional_registration_requirements,
      );
      processRequirements((profile.preferences as any[]) || [], preferencesMap, profile, excludedProfile?.preferences);
      processRequirements(
        (profile.knowledge_skills_abilities as any[]) || [],
        ksaMap,
        profile,
        excludedProfile?.knowledge_skills_abilities,
      );
      processRequirements(
        (profile.willingness_statements as any[]) || [],
        willingnessStatementsMap,
        profile,
        excludedProfile?.willingness_statements,
      );
    });

    function filterExcludedFields(requirements: any[], excludedFields: any[] | undefined) {
      if (!excludedFields) return requirements;
      // filter out fields that are present in the current profile:
      // item needs to have the same text and be custom
      const ret = requirements.filter(
        (req) => !excludedFields.some((excluded) => excluded.text === req.text && !excluded.tc_is_readonly),
      );
      return ret;
    }

    function processRequirements(
      requirements: any[],
      map: Map<string, RequirementEntry>,
      profile: any,
      excludedFields: any[] | undefined,
    ) {
      if (requirements) {
        filterExcludedFields(requirements, excludedFields)
          // .filter((requirement) => !requirement.is_readonly)
          .forEach((requirement) => {
            const text = requirement.text;
            if (!map.has(text)) {
              map.set(text, {
                text,
                jobFamilies: [],
                streams: [],
                classification: null,
                organization: null,
                tc_is_readonly: requirement.tc_is_readonly,
              });
            }
            const entry = map.get(text)!;
            entry.jobFamilies.push(...profile.jobFamilies.map((jf: any) => ({ id: jf.jobFamily.id })));
            entry.streams.push(...profile.streams.map((s: any) => ({ id: s.stream.id })));
          });
      }
    }

    // fetch minimum requirements based on classification
    // New code to fetch classification grade
    // let classificationGrade: string | null = null;
    // if (classificationId && classificationEmployeeGroupId) {
    //   const classification = await this.prisma.classification.findUnique({
    //     where: {
    //       id_employee_group_id_peoplesoft_id: {
    //         id: classificationId,
    //         employee_group_id: classificationEmployeeGroupId,
    //         peoplesoft_id: classificationPeoplesoftId,
    //       },
    //     },
    //     select: {
    //       grade: true,
    //     },
    //   });
    // }
    const classificationGrade = classifications.map((classification) => classification.grade) ?? null;

    // Fetch job profile minimum requirements
    let jobProfileMinimumRequirements = [];

    if (classificationGrade) {
      const minimumRequirements = await this.prisma.jobProfileMinimumRequirements.findMany({
        where: {
          grade: { in: classificationGrade },
        },
      });

      //we are only using the first classification as a basis for min requirements for now.
      // todo: this may result in incorrect updating on the front end when user changes classification when multiple options are used
      jobProfileMinimumRequirements = minimumRequirements.map((req) => ({
        text: req.requirement,
        jobFamilies: [],
        streams: [],
        classification:
          classifications[0].id && classifications[0].employee_group_id
            ? { id: classifications[0].id, employee_group_id: classifications[0].employee_group_id }
            : null,
        organization: null,
        tc_is_readonly: true, // Assuming these are read-only
      }));
    }

    // log requirementsMap, which is a Map
    const result = {
      professionalRegistrationRequirements: processMapToResult(professionalRegistrationMap),
      preferences: processMapToResult(preferencesMap),
      knowledgeSkillsAbilities: processMapToResult(ksaMap),
      willingnessStatements: processMapToResult(willingnessStatementsMap),
      securityScreenings: processMapToResult(securityScreeningMap),
      jobProfileMinimumRequirements: jobProfileMinimumRequirements,
    };

    function processMapToResult(map: Map<string, RequirementEntry>) {
      return Array.from(map.values())
        .map((entry) => ({
          ...entry,
          jobFamilies: Array.from(new Set(entry.jobFamilies.map((jf) => jf.id)))
            .filter((id) => jobFamilyIds.includes(id))
            .map((id) => ({ id })),
          streams: Array.from(new Set(entry.streams.map((s) => s.id)))
            .filter((id) => jobFamilyStreamIds.includes(id))
            .map((id) => ({ id })),
          classification: entry.classification,
        }))
        .sort((a, b) => a.text.localeCompare(b.text));
    }

    return result;
  }
}
