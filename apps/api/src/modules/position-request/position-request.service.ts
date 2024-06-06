import { Injectable, Logger } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JsonObject } from '@prisma/client/runtime/library';
import { btoa } from 'buffer';
import { Elements, autolayout, generateJobProfile, getALStatus } from 'common-kit';
import dayjs from 'dayjs';
import { diff_match_patch } from 'diff-match-patch';
import { Packer } from 'docx';
import GraphQLJSON from 'graphql-type-json';
import {
  PositionRequestCreateInput,
  PositionRequestStatus,
  PositionRequestUpdateInput,
  PositionRequestWhereInput,
  UuidFilter,
} from '../../@generated/prisma-nestjs-graphql';
import { AlexandriaError, AlexandriaErrorClass } from '../../utils/alexandria-error';
import { ClassificationService } from '../external/classification.service';
import { CrmService } from '../external/crm.service';
import { DepartmentService } from '../external/department.service';
import {
  IncidentCreateUpdateInput,
  IncidentStatus,
  IncidentThreadChannel,
  IncidentThreadContentType,
  IncidentThreadEntryType,
} from '../external/models/incident-create.input';
import {
  PositionCreateInput,
  PositionDuration,
  PositionStatus,
  PositionType,
} from '../external/models/position-create.input';
import { PeoplesoftService } from '../external/peoplesoft.service';
import { PositionService } from '../external/position.service';
import { JobProfileService } from '../job-profile/job-profile.service';
import { PrismaService } from '../prisma/prisma.service';
import { ExtendedFindManyPositionRequestWithSearch } from './args/find-many-position-request-with-search.args';

@ObjectType()
export class PositionRequestResponse {
  @Field()
  id: number;

  @Field()
  step: number;

  @Field()
  reports_to_position_id: number;

  @Field()
  parent_job_profile_id: number;

  @Field(() => GraphQLJSON)
  profile_json: any;

  @Field(() => GraphQLJSON)
  orgchart_json: any;
}

@ObjectType()
export class PositionRequestStatusCounts {
  @Field(() => Int)
  draft: number;

  @Field(() => Int)
  completed: number;

  @Field(() => Int)
  verification: number;

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  reviewCount: number;

  @Field(() => Int)
  actionRequiredCount: number;
}

interface AdditionalInfo {
  work_location_id?: string;
  department_id?: string;
  excluded_mgr_position_number?: string;
  comments?: string;
  branch?: string;
  division?: string;
}

function generateShortId(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

@Injectable()
export class PositionRequestApiService {
  private readonly logger = new Logger(PositionRequestApiService.name);
  // ...(searchResultIds != null && { id: { in: searchResultIds } }),

  constructor(
    private readonly classificationService: ClassificationService,
    private readonly crmService: CrmService,
    private readonly departmentService: DepartmentService,
    private readonly peoplesoftService: PeoplesoftService,
    private readonly prisma: PrismaService,
    private readonly positionService: PositionService,
    private readonly jobProfileService: JobProfileService,
  ) {}

  async generateUniqueShortId(length: number, retries: number = 5): Promise<string> {
    for (let attempt = 0; attempt < retries; attempt++) {
      const id = generateShortId(length);
      const existingEntry = await this.prisma.positionRequest.findFirst({
        where: { submission_id: id },
      });

      if (!existingEntry) {
        return id; // Unique ID found
      }
    }
    throw AlexandriaError('Failed to generate a unique ID');
  }

  async createPositionRequest(data: PositionRequestCreateInput, userId: string) {
    const uniqueSubmissionId = await this.generateUniqueShortId(10);

    return this.prisma.positionRequest.create({
      data: {
        department: data.department,
        additional_info: data.additional_info === null ? Prisma.DbNull : data.additional_info,
        step: data.step,
        max_step_completed: data.max_step_completed,
        reports_to_position_id: data.reports_to_position_id,
        profile_json: data.profile_json === null ? Prisma.DbNull : data.profile_json,
        orgchart_json: data.orgchart_json === null ? Prisma.DbNull : data.orgchart_json,
        // TODO: AL-146
        // user: data.user,
        user_id: userId,
        parent_job_profile: data.parent_job_profile,
        submission_id: uniqueSubmissionId,
        status: 'DRAFT',
        title: data.title,
        // TODO: AL-146
        // classification: data.classification,
        classification_id: data.classification_id,
      } as any as Prisma.PositionRequestCreateInput, // To prevent Excessive Stack Depth error,
      // include: {
      //   user: true,
      //   parent_job_profile: true,
      // },
    });
  }

  async submitPositionRequest(id: number, comment: string) {
    let positionRequest = await this.prisma.positionRequest.findUnique({ where: { id } });

    if (!positionRequest) throw AlexandriaError('Position request not found');

    // ensure comments are saved
    try {
      if (comment != null && comment.length > 0) {
        positionRequest = await this.prisma.positionRequest.update({
          where: { id },
          data: {
            additional_info: {
              ...(positionRequest.additional_info as JsonObject),
              comments: comment,
            },
          },
        });
      }
    } catch (error) {
      this.logger.error(error);
      throw AlexandriaError('Failed to save comments');
    }

    try {
      // there is no position number associated with this position request - create position in peoplesoft
      if (positionRequest.position_number == null) {
        // in testmode, we can skip the peoplesoft call to create position
        let position;
        try {
          if (process.env.TEST_ENV === 'true') {
            const positionRequestNeedsReview = await this.positionRequestNeedsReview(id);

            if (positionRequestNeedsReview.result === true)
              position = { positionNbr: '00137068' }; // 00137068 is proposed (for verification required test)
            else position = { positionNbr: '00137120' }; // this position needs to be in approved status in order to have valid final state
          } else {
            // note this returns data with this format (string with leading zeros): { positionNbr: '00137120', errMessage: '' }
            position = await this.createPositionForPositionRequest(id);
          }
        } catch (error) {
          this.logger.error(error);
          throw AlexandriaError('Failed to create position in Peoplesoft');
        }

        // write position number back to position request immidietely to prevent data loss and duplicate position creation
        try {
          positionRequest = await this.prisma.positionRequest.update({
            where: { id },
            data: {
              position_number: +position.positionNbr,
            },
          });
        } catch (error) {
          this.logger.error('Failed to save position number: ' + position.positionNbr);
          this.logger.error(error);
          throw AlexandriaError('Failed to save position number');
        }

        if (position.positionNbr.length > 0) {
          positionRequest = await this.submitPositionRequest_afterCreatePosition(
            position.positionNbr,
            id,
            positionRequest,
          );
        } else {
          throw AlexandriaError('Peoplesoft returned a blank position number');
        }
      } else {
        // we already have a position number assigned to this position request
        // check crm status etc
        positionRequest = await this.submitPositionRequest_afterCreatePosition(
          `${positionRequest.position_number.toString()}`.padStart(8, '0'),
          id,
          positionRequest,
        );
      }
    } catch (error) {
      if (!(error instanceof AlexandriaErrorClass)) {
        this.logger.error(error);
        throw AlexandriaError('An unexpected error occurred');
      }
      throw error;
    }
    return positionRequest;
  }

  private async submitPositionRequest_afterCreatePosition(positionNumber: string, id, positionRequest) {
    // retrieve position we just created from peoplesoft
    let positionObj: Record<string, any> | null;
    try {
      const result = await this.peoplesoftService.getPosition(positionNumber);
      const rows = result?.data?.query?.rows;
      positionObj = (rows ?? []).length > 0 ? rows[0] : null;
    } catch (error) {
      this.logger.error(error);
      throw AlexandriaError('Failed to retrieve position from Peoplesoft');
    }

    if (!positionObj) throw AlexandriaError('Failed to retrieve position from Peoplesoft');

    // update org chart snapshot
    try {
      await this.submitPositionRequest_updateOrgChart(positionObj, positionRequest, id);
    } catch (error) {
      this.logger.error(error);
      throw AlexandriaError('Failed to update org chart');
    }

    // CRM Incident Managements
    let crm_id;
    let crm_lookup_name;
    let crm_status;
    let crm_category;
    try {
      const incident = await this.createOrUpdateCrmIncidentForPositionRequest(id);
      ({ crm_id, crm_lookup_name, crm_status, crm_category } = incident);
      await this.prisma.positionRequest.update({
        where: { id },
        data: {
          crm_id: incident.id,
        },
      });
    } catch (error) {
      if (error instanceof AlexandriaErrorClass) {
        throw error; // Rethrow the AlexandriaError
      } else {
        this.logger.error(error);
        throw AlexandriaError('Failed to create or update CRM service request');
      }
    }

    try {
      // determine the status for the position request based on CRM status + peoplesoft status
      const incomingPositionRequestStatus = getALStatus({
        category: crm_category,
        crm_status: crm_status,
        ps_status: positionObj['A.POSN_STATUS'],
        ps_effective_status: positionObj['EFF_STATUS'],
      });

      if (incomingPositionRequestStatus === 'UNKNOWN') {
        this.logger.warn(
          `Failed to map to an internal status for position request id ${id}: crm_id: ${crm_id}, crm_lookup_name: ${crm_lookup_name}, crm status:  ${crm_status}, crm category: ${crm_category}, ps status: ${positionObj['A.POSN_STATUS']}, positionNumber: ${positionNumber}`,
        );
        // incomingPositionRequestStatus = 'DRAFT';
        throw AlexandriaError('Unexpected error occured while creating position request.');
      }

      // we will potentially create PRs with UNKNOWN status if there is an issue with CRM or PS creation
      return await this.prisma.positionRequest.update({
        where: { id },
        data: {
          status: incomingPositionRequestStatus as PositionRequestStatus,
        },
      });
    } catch (error) {
      if (error instanceof AlexandriaErrorClass) {
        throw error; // Rethrow the AlexandriaError
      } else {
        this.logger.error(error);
        throw AlexandriaError('Failed to update position request status');
      }
    }
  }

  private async submitPositionRequest_updateOrgChart(positionObj, positionRequest, id) {
    // get classification for this new position
    const classification = await this.classificationService.getClassification({
      where: { id: positionObj['A.JOBCODE'] },
    });

    // get department in which this position was created
    const department = await this.departmentService.getDepartment({ where: { id: positionObj['A.DEPTID'] } });
    const { edges, nodes } = positionRequest.orgchart_json as Record<string, any> as Elements;

    // Update supervisor, excluded manager nodes
    const excludedManagerId = (positionRequest.additional_info as AdditionalInfo | null)?.excluded_mgr_position_number;
    const supervisorId = positionObj['A.REPORTS_TO'];
    nodes.forEach((node) => {
      node.data = {
        ...node.data,
        isAdjacent: [excludedManagerId, supervisorId].includes(node.id),
        isExcludedManager: node.id === excludedManagerId,
        isNewPosition: false, // Clear previous positions marked as new
        isSelected: false,
        isSupervisor: node.id === supervisorId,
      };
    });

    // Add edge & node for new position
    // add edge
    const edgeId = `${supervisorId}-${positionObj['A.POSITION_NBR']}`;
    if (edges.find((edge) => edge.id === edgeId) == null) {
      edges.push({
        id: edgeId,
        source: supervisorId,
        target: positionObj['A.POSITION_NBR'],
        style: { stroke: 'blue' },
        type: 'smoothstep',
        animated: true,
        selected: true,
      });
    }

    // add node
    const nodeId = positionObj['A.POSITION_NBR'];
    if (nodes.find((node) => node.id === nodeId) == null) {
      nodes.push({
        id: nodeId,
        type: 'org-chart-card',
        data: {
          id: nodeId,
          isAdjacent: true,
          isNewPosition: true,
          title: positionObj['A.DESCR'],
          classification: {
            id: classification.id,
            code: classification.code,
            name: classification.name,
          },
          department: {
            id: department.id,
            organization_id: department.organization_id,
            name: department.name,
          },
          employees: [],
        },
        position: { x: 0, y: 0 },
      });
    }

    //write org chart changes
    const positionRequestNew = await this.prisma.positionRequest.update({
      where: { id },
      data: {
        orgchart_json: autolayout({ edges, nodes }) as any,
      },
    });
    return positionRequestNew;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getPositionRequests(
    { search, where, onlyCompletedForAll, ...args }: ExtendedFindManyPositionRequestWithSearch,
    userId: string,
    userRoles: string[] = [],
  ) {
    let searchConditions = {};
    if (search) {
      searchConditions = {
        OR: [
          {
            title: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            submission_id: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      };
    }

    let whereConditions = {
      ...searchConditions,
      ...where,
    };

    // If the user has the "total-compensation" role and wants only completed requests for all users
    if (userRoles.includes('total-compensation') && onlyCompletedForAll) {
      whereConditions = {
        ...whereConditions,
        status: { equals: 'COMPLETED' },
      };
      // If the user is in "classification" role, then return only requests assigned to this user using classificationAssignedTo property
    } else if (userRoles.includes('classification')) {
      whereConditions = {
        ...whereConditions,
        // classificationAssignedTo: { equals: userId }, // todo: enable this after testing session
        status: { not: { equals: 'DRAFT' } },
      };
    } else {
      // Default behavior for other users - get position requests for the current user only
      whereConditions = {
        ...whereConditions,
        user_id: { equals: userId },
      };
    }

    const positionRequests = await this.prisma.positionRequest.findMany({
      where: whereConditions,
      // where: {
      //   ...searchConditions,
      //   ...where,
      //   user_id: userId,
      // },
      ...args,
      orderBy: [...(args.orderBy || []), { id: 'desc' }],
      select: {
        id: true,
        parent_job_profile_id: true,
        step: true,
        reports_to_position_id: true,
        user_id: true,
        title: true,
        position_number: true,
        classification_id: true,
        submission_id: true,
        status: true,
        updated_at: true,
        parent_job_profile: true,
        approved_at: true,
        submitted_at: true,
        crm_id: true,
        crm_lookup_name: true,
        shareUUID: true,
        additional_info: true,
      },
    });

    // todo: AL-146 this should not be needed if the foreign key relationship is working properly in schema.prisma

    // Collect all unique classification IDs from the position requests
    const classificationIds = [
      ...new Set(positionRequests.map((pr) => pr.classification_id).filter((id) => id != null)), // Filters out null values
    ];

    // Fetch classifications based on the collected IDs
    const classifications = await this.prisma.classification.findMany({
      where: {
        id: { in: classificationIds },
      },
      select: {
        id: true,
        code: true,
      },
    });

    // Create a map for easy lookup
    const classificationMap = new Map(classifications.map((c) => [c.id, c.code]));

    // Collect all unique user IDs from the position requests
    const userIds = [...new Set(positionRequests.map((pr) => pr.user_id).filter((id) => id != null))];

    // Fetch users based on the collected IDs
    const users = await this.prisma.user.findMany({
      where: {
        id: { in: userIds },
      },
      select: {
        id: true,
        name: true, // Assuming 'name' is the field in your User model
      },
    });

    // Create a map for easy user lookup
    const userMap = new Map(users.map((u) => [u.id, u.name]));

    // Merge position requests with classification codes
    const mergedResults = positionRequests.map((pr) => ({
      ...pr,
      classification_code: classificationMap.get(pr.classification_id),
      user_name: userMap.get(pr.user_id),
    }));

    // Check if we need to sort by classification_code
    const orderByClassificationCode = args.orderBy?.find((o) => o.classification_code);
    if (orderByClassificationCode) {
      // Determine the sort direction
      const sortDirection = orderByClassificationCode.classification_code.sort === 'asc' ? 1 : -1;

      // Sort mergedResults by classification_code
      mergedResults.sort((a, b) => {
        if (a.classification_code < b.classification_code) {
          return -1 * sortDirection;
        }
        if (a.classification_code > b.classification_code) {
          return 1 * sortDirection;
        }
        return 0;
      });
    }
    return mergedResults; //.reverse();
  }

  async getSharedPositionRequest(shareUUID: string) {
    // console.log('getPositionRequest!', userRoles);
    if (!shareUUID || shareUUID === '') {
      throw AlexandriaError('Invalid share URL');
    }

    const whereCondition: { shareUUID: { equals: string } } = { shareUUID: { equals: shareUUID } };

    let positionRequest;
    try {
      positionRequest = await this.prisma.positionRequest.findFirstOrThrow({
        where: whereCondition,
        include: {
          parent_job_profile: true,
        },
      });
      // catch findFirstOrThrow error
    } catch (error) {
      throw AlexandriaError('Invalid share URL');
    }

    // console.log('positionRequest: ', positionRequest, JSON.stringify(whereCondition));

    if (!positionRequest) {
      return null;
    }

    // TODO: AL-146 - this should not be needed if the foreign key relationship is working properly in schema.prisma
    // Fetch classification

    const classification =
      positionRequest.classification_id == null
        ? null
        : await this.prisma.classification.findUnique({
            where: { id: positionRequest.classification_id },
            select: {
              code: true, // Assuming 'code' is the field you want from the classification
            },
          });

    // Fetch user
    const user = await this.prisma.user.findUnique({
      where: { id: positionRequest.user_id },
      select: {
        name: true, // Assuming 'name' is the field you want from the user
        email: true,
      },
    });

    return {
      ...positionRequest,
      classification_code: classification?.code,
      user_name: user?.name,
      email: user?.email,
    };
  }

  async getPositionRequest(id: number, userId: string, userRoles: string[] = []) {
    let whereCondition: { id: number; user_id?: UuidFilter; NOT?: Array<PositionRequestWhereInput> } = { id };

    // If the user does not have the "total-compesation" or "classification" role, the filter will include the requesting user id
    // otherwise, allow user to access any position by id, except those in "DRAFT" status
    if (['classification', 'total-compensation'].some((value) => userRoles.includes(value))) {
      whereCondition = {
        ...whereCondition,
        // NOT: [{ status: { equals: 'DRAFT' } }],
      };
    } else {
      whereCondition = {
        ...whereCondition,
        user_id: { equals: userId },
      };
    }

    const positionRequest = await this.prisma.positionRequest.findUnique({
      where: whereCondition,
      include: {
        parent_job_profile: true,
      },
    });

    // console.log('positionRequest: ', positionRequest, JSON.stringify(whereCondition));

    if (!positionRequest) {
      return null;
    }

    // TODO: AL-146 - this should not be needed if the foreign key relationship is working properly in schema.prisma
    // Fetch classification

    const classification =
      positionRequest.classification_id == null
        ? null
        : await this.prisma.classification.findUnique({
            where: { id: positionRequest.classification_id },
            select: {
              code: true, // Assuming 'code' is the field you want from the classification
            },
          });

    // Fetch user
    const user = await this.prisma.user.findUnique({
      where: { id: positionRequest.user_id },
      select: {
        name: true, // Assuming 'name' is the field you want from the user
        email: true,
      },
    });

    return {
      ...positionRequest,
      classification_code: classification?.code,
      user_name: user?.name,
      email: user?.email,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getPositionRequestCount(
    { search, where, onlyCompletedForAll }: ExtendedFindManyPositionRequestWithSearch,
    userId: string,
    userRoles: string[] = [],
  ): Promise<PositionRequestStatusCounts> {
    let searchConditions = {};
    if (search) {
      searchConditions = {
        OR: [
          {
            title: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            submission_id: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      };
    }

    let whereConditions = {
      ...searchConditions,
      ...where,
    };

    // Update where conditions based on the "total-compensation" role and onlyCompletedForAll flag
    if (userRoles.includes('total-compensation') && onlyCompletedForAll) {
      whereConditions = {
        ...whereConditions,
        status: { equals: 'COMPLETED' },
      };
    } else if (userRoles.includes('classification')) {
      // for classification, return the count of all entries that are not in draft state, across the board
      whereConditions = {
        ...whereConditions,
        // classificationAssignedTo: { equals: userId }, // todo: enable this after testing session
        status: { not: { equals: 'DRAFT' } },
      };
    } else {
      whereConditions = {
        ...whereConditions,
        user_id: { equals: userId },
      };
    }

    // Function to get count for a specific status
    const getCountForStatus = async (status: PositionRequestStatus) => {
      return await this.prisma.positionRequest.count({
        where: {
          ...whereConditions,
          status: status,
        },
      });
    };

    // Get counts for each status
    const draftCount = await getCountForStatus(PositionRequestStatus.DRAFT);
    const completedCount = await getCountForStatus(PositionRequestStatus.COMPLETED);
    const verificationCount = await getCountForStatus(PositionRequestStatus.VERIFICATION);
    const reviewCount = await getCountForStatus(PositionRequestStatus.REVIEW);
    const actionRequiredCount = await getCountForStatus(PositionRequestStatus.ACTION_REQUIRED);

    // Return the counts
    return {
      draft: draftCount,
      completed: completedCount,
      verification: verificationCount,
      reviewCount: reviewCount,
      actionRequiredCount: actionRequiredCount,
      total: draftCount + completedCount + verificationCount + reviewCount + actionRequiredCount,
    };
  }

  async getPositionRequestUserClassifications(userId: string) {
    const positionRequests = await this.prisma.positionRequest.findMany({
      where: {
        user_id: userId,
      },
      select: {
        id: true,
        parent_job_profile_id: true,
        step: true,
        reports_to_position_id: true,
        user_id: true,
        title: true,
        position_number: true,
        classification_id: true,
        submission_id: true,
        status: true,
      },
    });

    // todo: this should not be needed if the foreign key relationship is working properly in schema.prisma

    // Collect all unique classification IDs from the position requests
    const classificationIds = [
      ...new Set(positionRequests.map((pr) => pr.classification_id).filter((id) => id != null)),
    ];

    if (!classificationIds) return [];

    // Fetch classifications based on the collected IDs
    const classifications = await this.prisma.classification.findMany({
      where: {
        id: { in: classificationIds },
      },
      select: {
        id: true,
        code: true,
      },
    });

    return classifications;
  }

  async getPositionRequestStatuses() {
    // return enum values as array of strings
    const states = Object.values(PositionRequestStatus).filter(
      (value) => typeof value === 'string' && value !== 'DRAFT',
    );
    return states;
  }

  async getPositionRequestSubmittedBy() {
    const positionRequests = await this.prisma.positionRequest.findMany({
      select: {
        user_id: true,
      },
    });

    // todo: AL-146 this should not be needed if the foreign key relationship is working properly in schema.prisma
    // Collect all unique user IDs from the position requests
    const userIds = [...new Set(positionRequests.map((pr) => pr.user_id).filter((id) => id != null))];

    // Fetch users based on the collected IDs
    const users = await this.prisma.user.findMany({
      where: {
        id: { in: userIds },
      },
      select: {
        id: true,
        name: true, // Assuming 'name' is the field in your User model
      },
    });

    return Array.from(new Map(users.map((user) => [user.id, user])).values());
  }

  async getPositionRequestClassifications() {
    const positionRequests = await this.prisma.positionRequest.findMany({
      where: {
        status: 'COMPLETED',
      },
      select: {
        classification_id: true,
      },
    });

    // todo: this should not be needed if the foreign key relationship is working properly in schema.prisma

    // Collect all unique classification IDs from the position requests
    const classificationIds = [
      ...new Set(positionRequests.map((pr) => pr.classification_id).filter((id) => id !== null)),
    ];

    // Fetch classifications based on the collected IDs
    const classifications = await this.prisma.classification.findMany({
      where: {
        id: { in: classificationIds },
      },
      select: {
        id: true,
        code: true,
      },
    });

    return classifications;
  }

  async getPositionRequestJobStoreNumbers() {
    const uniqueNumbers = await this.prisma.jobProfile.findMany({
      where: {
        position_request: {
          some: {
            status: 'COMPLETED',
            parent_job_profile_id: {
              not: null,
            },
          },
        },
      },
      select: {
        number: true,
      },
      distinct: ['number'],
    });

    const ret = uniqueNumbers.map((profile) => profile.number);
    return ret;
  }

  dataHasChanges(original: string, modified: string): boolean {
    let isDifferent = false;

    const dmp = new diff_match_patch();
    const accDiff = dmp.diff_main(original, modified);
    dmp.diff_cleanupSemantic(accDiff);

    if (accDiff.some((arr) => arr[0] < 0 || arr[0] > 0)) {
      isDifferent = true;
    }

    return isDifferent;
  }

  async updatePositionRequest(id: number, updateData: PositionRequestUpdateInput, userRoles: string[] = []) {
    // todo: AL-146 - tried to do this with a spread operator, but getting an error
    let updatingAdditionalInfo = false;
    const updatePayload: Prisma.PositionRequestUpdateInput = {
      additional_info: {} as Prisma.JsonValue,
    };

    if (updateData.step !== undefined) {
      updatePayload.step = updateData.step;
    }

    if (updateData.max_step_completed !== undefined) {
      updatePayload.max_step_completed = updateData.max_step_completed;
    }

    if (updateData.reports_to_position_id !== undefined) {
      updatePayload.reports_to_position_id = updateData.reports_to_position_id;
    }

    if (updateData.profile_json !== undefined) {
      updatePayload.profile_json = updateData.profile_json === null ? Prisma.DbNull : updateData.profile_json;
      // attach original profile json
      if (updateData.profile_json !== null) {
        const originalProfile = await this.jobProfileService.getJobProfile(updateData.profile_json.id, userRoles);
        updateData.profile_json.original_profile_json = originalProfile;
      }
    }

    if (updateData.orgchart_json !== undefined) {
      updatePayload.orgchart_json = updateData.orgchart_json === null ? Prisma.DbNull : updateData.orgchart_json;
    }

    if (updateData.title !== undefined) {
      updatePayload.title = updateData.title;
    }

    if (updateData.classification_id !== undefined) {
      updatePayload.classification_id = updateData.classification_id;
    }

    // if (updateData.status !== undefined) {
    //   updatePayload.status = updateData.status;
    // }

    if (updateData.parent_job_profile !== undefined) {
      if (updateData.parent_job_profile.connect.id == null) updatePayload.parent_job_profile = { disconnect: true };
      else updatePayload.parent_job_profile = { connect: { id: updateData.parent_job_profile.connect.id } };
    }

    if (updateData.department !== undefined) {
      updatePayload.department = { connect: { id: updateData.department.connect.id } };
    }

    // additional information form data:

    const additionalInfo = updateData.additional_info as AdditionalInfo | null;

    if (additionalInfo) {
      updatingAdditionalInfo = true;
      if (additionalInfo.excluded_mgr_position_number !== undefined) {
        (updatePayload.additional_info as Record<string, Prisma.JsonValue>).excluded_mgr_position_number =
          additionalInfo.excluded_mgr_position_number;
      }

      if (additionalInfo.department_id !== undefined) {
        (updatePayload.additional_info as Record<string, Prisma.JsonValue>).department_id =
          additionalInfo.department_id;
      }

      if (additionalInfo.branch !== undefined) {
        (updatePayload.additional_info as Record<string, Prisma.JsonValue>).branch = additionalInfo.branch;
      }

      if (additionalInfo.division !== undefined) {
        (updatePayload.additional_info as Record<string, Prisma.JsonValue>).division = additionalInfo.division;
      }

      if (additionalInfo.work_location_id !== undefined) {
        (updatePayload.additional_info as Record<string, Prisma.JsonValue>).work_location_id =
          additionalInfo.work_location_id;
      }

      if (
        additionalInfo.excluded_mgr_position_number !== undefined &&
        additionalInfo.excluded_mgr_position_number !== null // it might be null if we're unsetting, e.g. when user changes supervisor on org chart
      ) {
        // if updating the excluded manager position number, we need to check if that position
        // exists in the org chart, if it doesn't we need to add this position to the org chart
        // such that the top level of the reporting chain reports to this position

        // get the org chart

        // check if the excluded manager position number is in the org chart

        // if not in org chart, fetch employee info from peoplesoft

        // get the top level of the reporting chain, from the report_to position number and up

        // update org chart json

        // save result to the database

        const positionRequest = await this.prisma.positionRequest.findUnique({
          where: { id: id },
          select: { orgchart_json: true, reports_to_position_id: true },
        });

        const orgChart = positionRequest.orgchart_json;

        if (orgChart && typeof orgChart === 'object' && 'nodes' in orgChart) {
          // Remove existing node with isExcludedManager = true
          const updatedNodes = (orgChart.nodes as any[]).filter((node) => node.data?.isExcludedManager !== true);

          const updatedEdges = (orgChart.edges as any[]).filter((edge) => {
            const sourceNode = (orgChart.nodes as any[]).find((node) => node.id === edge.source);
            const targetNode = (orgChart.nodes as any[]).find((node) => node.id === edge.target);
            return sourceNode?.data?.isExcludedManager !== true && targetNode?.data?.isExcludedManager !== true;
          });

          const isExcludedManagerInOrgChart = (orgChart.nodes as any[]).some(
            (node) => node.id === additionalInfo.excluded_mgr_position_number,
          );

          // console.log('isExcludedManagerInOrgChart: ', isExcludedManagerInOrgChart);

          if (!isExcludedManagerInOrgChart) {
            // console.log('isExcludedManagerInOrgChart false');

            const employeeInfo = await this.positionService.getPositionProfile(
              additionalInfo.excluded_mgr_position_number,
              true,
            );

            // console.log('employeeInfo: ', employeeInfo);

            const topLevelPositionId = this.getTopLevelReportingChain(orgChart, positionRequest.reports_to_position_id);

            // console.log('topLevelPositionId: ', topLevelPositionId);

            const updatedOrgChart = {
              ...orgChart,
              nodes: [
                ...updatedNodes,
                {
                  id: additionalInfo.excluded_mgr_position_number,
                  data: {
                    id: additionalInfo.excluded_mgr_position_number,
                    title: employeeInfo[0].positionDescription,
                    isExcludedManager: true,
                    employees: employeeInfo.map((employee) => ({
                      id: employee.employeeId,
                      name: employee.employeeName,
                      status: employee.status,
                    })),
                    department: {
                      id: employeeInfo[0].departmentId,
                      name: employeeInfo[0].departmentName,
                      organization_id: employeeInfo[0].organizationId,
                    },
                    classification: {
                      id: employeeInfo[0].classificationId,
                      code: employeeInfo[0].classificationCode,
                      name: employeeInfo[0].classification,
                    },
                  },
                  type: 'org-chart-card',
                  position: { x: 0, y: 0 },
                  sourcePosition: 'bottom',
                  targetPosition: 'top',
                },
              ],
              edges: [
                ...updatedEdges,
                {
                  id: `${additionalInfo.excluded_mgr_position_number}-${topLevelPositionId}`,
                  type: 'smoothstep',
                  source: additionalInfo.excluded_mgr_position_number,
                  target: topLevelPositionId,
                  style: { strokeDasharray: '5 5' },
                },
              ],
            };

            // console.log('new org chart: ', JSON.stringify(updatedOrgChart));
            updatePayload.orgchart_json = updatedOrgChart;
          }
        }
      }

      if (additionalInfo.comments !== undefined) {
        (updatePayload.additional_info as Record<string, Prisma.JsonValue>).comments = additionalInfo.comments;
      }
    } else if (additionalInfo === null) {
      updatingAdditionalInfo = true;
      updatePayload.additional_info = Prisma.DbNull;
    }

    if (!updatingAdditionalInfo) delete updatePayload.additional_info;

    // First pass updates
    const positionRequest = await this.prisma.positionRequest.update({
      where: { id: id },
      data: updatePayload,
    });

    return positionRequest;
  }

  private getTopLevelReportingChain(orgChart: any, startPositionId: string): string {
    // console.log('getTopLevelReportingChain, startPositionId: ', startPositionId);

    // Find the edge with target equal to the startPositionId
    const startEdge = orgChart.edges.find((edge: any) => edge.target === startPositionId);

    if (!startEdge) {
      // If no edge is found with the startPositionId as the target, it means it's already a top-level position
      // console.log('No edge found with startPositionId as target. Returning startPositionId: ', startPositionId);
      return startPositionId;
    }

    let currentPositionId = startEdge.source;
    // console.log('Starting position: ', currentPositionId);

    while (true) {
      // Find the edge where the current position is the target
      const currentEdge = orgChart.edges.find((edge: any) => edge.target === currentPositionId);

      if (!currentEdge) {
        // If no edge is found with the current position as the target, it means it's a terminal node
        // console.log('No edge found with currentPositionId as target. Returning currentPositionId: ', currentPositionId);
        return currentPositionId;
      }

      // Check if the source of the current edge exists in the nodes array
      const sourceNode = orgChart.nodes.find((node: any) => node.id === currentEdge.source);

      if (!sourceNode) {
        // If the source node doesn't exist in the nodes array, it means it's a terminal node
        // console.log('Source node not found in nodes array. Returning currentPositionId: ', currentPositionId);
        return currentPositionId;
      }

      // Update the current position to the source of the current edge
      currentPositionId = currentEdge.source;
      // console.log('Moving to next position: ', currentPositionId);
    }
  }

  async deletePositionRequest(id: number, userId: string) {
    const result = await this.prisma.positionRequest.delete({ where: { id, user_id: userId, status: 'DRAFT' } });
    return result;
  }

  async positionRequestNeedsReview(id: number) {
    const reasons = [];
    const positionRequest = await this.prisma.positionRequest.findUnique({ where: { id: id } });
    if (positionRequest.parent_job_profile_id == null) {
      return { result: false, reasons: reasons };
    }
    const jobProfile = await this.prisma.jobProfile.findUnique({
      where: { id: positionRequest.parent_job_profile_id },
      include: {
        jobFamilies: {
          include: {
            jobFamily: true, // Ensures that the related jobFamily data is returned
          },
        },
      },
    });

    // If the Job Profile is denoted as requiring review, it _must_ be reviewed every time
    let profilesRequiresReview = false;
    if (jobProfile.review_required === true) {
      profilesRequiresReview = true;
      reasons.push('Job Profile is denoted as requiring review');
      // return { result: true, reasons: reasons };
    }

    if (positionRequest.profile_json === null) {
      return { result: profilesRequiresReview, reasons: reasons };
    }

    // If the job profile is _not_ denoted as requiring review, it must be reviewed _only_ if significant sections have been changed

    const prJobProfile = positionRequest.profile_json as Record<string, any>;

    // Find position request job profile signficant sections
    const prJobProfileSignificantSections = {
      accountabilities: prJobProfile.accountabilities
        .filter(
          (obj) =>
            (obj.is_significant === true && (Object.keys(obj).indexOf('disabled') === -1 || obj.disabled === false)) ||
            ((Object.keys(obj).indexOf('is_significant') === -1 || obj.is_significant === false) &&
              obj.isCustom === true),
        )
        .map((obj) => obj.text),
      education: prJobProfile.education
        .filter(
          (obj) =>
            obj.is_significant === true && (Object.keys(obj).indexOf('disabled') === -1 || obj.disabled === false),
        )
        .map((obj) => obj.text),
      job_experience: prJobProfile.job_experience
        .filter(
          (obj) =>
            obj.is_significant === true && (Object.keys(obj).indexOf('disabled') === -1 || obj.disabled === false),
        )
        .map((obj) => obj.text),
      security_screenings: prJobProfile.security_screenings // all security screenings are significant - there is no is_significant flag
        .filter((obj) => Object.keys(obj).indexOf('disabled') === -1 || obj.disabled === false)
        .map((obj) => obj.text),
    };

    // Find base job profile significant sections
    const jobProfileSignficantSections = {
      accountabilities: (jobProfile.accountabilities as Record<string, any>)
        .filter(
          (obj) =>
            obj.is_significant === true && (Object.keys(obj).indexOf('disabled') === -1 || obj.disabled === false),
        )
        .map((obj) => obj.text),
      education: (jobProfile.education as Record<string, any>)
        .filter(
          (obj) =>
            obj.is_significant === true && (Object.keys(obj).indexOf('disabled') === -1 || obj.disabled === false),
        )
        .map((obj) => obj.text),
      job_experience: (jobProfile.job_experience as Record<string, any>)
        .filter(
          (obj) =>
            obj.is_significant === true && (Object.keys(obj).indexOf('disabled') === -1 || obj.disabled === false),
        )
        .map((obj) => obj.text),
      security_screenings: (jobProfile.security_screenings as Record<string, any>) // all security screenings are significant - there is no is_significant flag
        .filter((obj) => Object.keys(obj).indexOf('disabled') === -1 || obj.disabled === false)
        .map((obj) => obj.text),
    };

    // Compare changes between position request job profile significant sections and
    // job profile significant sections
    const significantSectionChanges = [
      // Accountabilities
      this.dataHasChanges(
        JSON.stringify(jobProfileSignficantSections.accountabilities),
        JSON.stringify(prJobProfileSignificantSections.accountabilities),
      ),
      // Education
      this.dataHasChanges(
        JSON.stringify(jobProfileSignficantSections.education),
        JSON.stringify(prJobProfileSignificantSections.education),
      ) && !jobProfile.jobFamilies.some((jf) => jf.jobFamily.name == 'Administrative Services'), // AL-619 this is a temporary measure to disable education requirements for admin family

      // Job Experience
      this.dataHasChanges(
        JSON.stringify(jobProfileSignficantSections.job_experience),
        JSON.stringify(prJobProfileSignificantSections.job_experience),
      ),
      // Security Screenings
      this.dataHasChanges(
        JSON.stringify(jobProfileSignficantSections.security_screenings),
        JSON.stringify(prJobProfileSignificantSections.security_screenings),
      ),
    ];

    // Collect reasons for changes
    if (significantSectionChanges.some((value) => value === true)) {
      if (significantSectionChanges[0]) {
        reasons.push('Changes in Accountabilities');
      }
      if (significantSectionChanges[1]) {
        reasons.push('Changes in Education');
      }
      if (significantSectionChanges[2]) {
        reasons.push('Changes in Job Experience');
      }
      if (significantSectionChanges[3]) {
        reasons.push('Changes in Security Screenings');
      }
    }

    return {
      result: significantSectionChanges.some((value) => value === true) || profilesRequiresReview,
      reasons: reasons,
    };
  }

  async createOrUpdateCrmIncidentForPositionRequest(id: number) {
    try {
      const needsReview = (await this.positionRequestNeedsReview(id)).result;

      const positionRequest = await this.prisma.positionRequest.findUnique({ where: { id } });
      const classification = await this.classificationService.getClassification({
        where: { id: positionRequest.classification_id },
      });
      const { metadata } = await this.prisma.user.findUnique({ where: { id: positionRequest.user_id } });
      const contactId =
        ((metadata ?? {}) as Record<string, any>).crm?.contact_id ?? (process.env.TEST_ENV === 'true' ? 231166 : null);

      // without contactId we cannot create an incident
      // this can happen if this is new staff member and they have not been assigned a CRM contact yet
      if (contactId === null) {
        throw AlexandriaError('CRM Contact ID not found');
      }

      const additionalInfo = positionRequest.additional_info as AdditionalInfo | null;

      const paylist_department = await this.prisma.department.findUnique({
        where: { id: additionalInfo.department_id },
      });
      const location = await this.prisma.location.findUnique({ where: { id: paylist_department.location_id } });
      const parentJobProfile = await this.prisma.jobProfile.findUnique({
        where: { id: positionRequest.parent_job_profile_id },
      });

      const jobProfileDocument =
        positionRequest.profile_json != null
          ? generateJobProfile({
              jobProfile: positionRequest.profile_json as Record<string, any>,
              parentJobProfile: parentJobProfile,
            })
          : null;
      const jobProfileBase64 = await Packer.toBase64String(jobProfileDocument);

      const orgChartBase64 =
        positionRequest.orgchart_json != null ? btoa(JSON.stringify(positionRequest.orgchart_json)) : null;

      const zeroFilledPositionNumber =
        positionRequest.position_number != null ? String(positionRequest.position_number).padStart(8, '0') : null;

      const data: IncidentCreateUpdateInput = {
        subject: `Job Store Beta - Position Number Request - ${classification.code}`,
        primaryContact: { id: contactId },
        assignedTo: {
          staffGroup: {
            lookupName: 'HRSC - Classification',
          },
        },
        statusWithType: {
          status: {
            id: needsReview ? IncidentStatus.Unresolved : IncidentStatus.Solved,
          },
        },
        // Need to determine usage of this block
        category: {
          id: 1930,
        },
        severity: {
          lookupName: '4 - Routine',
        },
        threads: [
          {
            channel: {
              id: IncidentThreadChannel.CSSWeb,
            },
            contentType: {
              id: IncidentThreadContentType.TextHtml,
            },
            entryType: {
              id: IncidentThreadEntryType.PrivateNote,
            },
            text: `   
          <div>         
            <a href="https://jobstore.apps.silver.devops.gov.bc.ca/classification-tasks/${
              positionRequest.id
            }">View this position in the Job Store</a>
            <br />
            <strong>
            ${
              positionRequest.position_number != null
                ? `The ${needsReview === true ? 'proposed' : 'approved'} position # is: ${zeroFilledPositionNumber}`
                : `No position was created for this request`
            }
            </strong> 
          </div>`,
          },
          {
            channel: {
              id: IncidentThreadChannel.CSSWeb,
            },
            contentType: {
              id: IncidentThreadContentType.TextHtml,
            },
            entryType: {
              id: IncidentThreadEntryType.Customer,
            },
            text: `
          <div>
            ${
              (additionalInfo.comments ?? '').length > 0
                ? `
            <br />
            <strong>The following note was added to this position request:</strong>
            <br />
            <em>${additionalInfo.comments}</em>`
                : ''
            }
            <br />
            <ul>
              <li>Have you received executive approval (Depuity Minister or delegate) for this new position?    Yes</li>
              <li>What is the effective date?    ${dayjs().format('MMM D, YYYY')}</li>
              <li>What is the pay list/department ID number?    ${paylist_department.id}</li>
              <li>What is the expected classification level?    ${classification.code} (${classification.name})</li>
              <li>Is this position included or excluded?    Included</li>
              <li>Is the position full-time or part-time?    Full-time</li>
              <li>What is the job title?    ${positionRequest.title}</li>
              <li>Is this a regular or temporary position?    Regular</li>
              <li>Who is the first level excluded manager for this position?    ${
                positionRequest.reports_to_position_id
              }</li>
              <li>Where is the position location?    ${location.name}</li>
              <li>Which position number will the position report to?    ${positionRequest.reports_to_position_id}</li>
              <li>Is a Job Store profile being used? If so, what is the Job Store profile number?    ${
                parentJobProfile.number
              }</li>
              <li>Has the classification been approved by Classification Services? If so, what is the E-Class case number? (Not required if using Job Store profile)    n/a</li>
              <li>Please attach a copy of the job profile you will be using.    Attached</li>
              <li>Please attach a copy of your Organization Chart that shows the topic position and the job titles, position numbers and classifiction levels, of the supervisor, peer and subordinate positions.    Attached</li>
            </ul>
          </div>

          `,
          },
        ],
        fileAttachments: [
          {
            name: `${zeroFilledPositionNumber} - ${positionRequest.title} ${classification.code}.docx`.substring(0, 40),
            fileName: `${zeroFilledPositionNumber} - ${positionRequest.title} ${classification.code}.docx`,
            contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            data: jobProfileBase64,
          },
          {
            name: `${zeroFilledPositionNumber} - Organization Chart.json`.substring(0, 40),
            fileName: `${zeroFilledPositionNumber} - Organization Chart.json`,
            contentType: 'application/json',
            data: orgChartBase64,
          },
        ],
      };

      let incident: Record<string, any> = {};
      if (positionRequest.crm_id === null) {
        // console.log(JSON.stringify(data));

        // this.logger.debug('incident creation ' + JSON.stringify(data));
        incident = await this.crmService.createIncident(data);
      } else {
        await this.crmService.updateIncident(positionRequest.crm_id, data);
      }
      // re-fetch the data in the structure we need
      incident = await this.crmService.getIncident(incident.id);

      if (incident.crm_lookup_name != null) {
        await this.prisma.positionRequest.update({
          where: { id: positionRequest.id },
          data: {
            crm_lookup_name: incident.crm_lookup_name,
          },
        });
      }

      return incident;
    } catch (error) {
      if (error instanceof AlexandriaErrorClass) {
        throw error; // Rethrow the AlexandriaError
      } else {
        this.logger.error(error);
        throw AlexandriaError('Failed to create or update CRM service request');
      }
    }
  }

  async createPositionForPositionRequest(id: number) {
    const positionRequestNeedsReview = await this.positionRequestNeedsReview(id);

    const positionRequest = await this.prisma.positionRequest.findUnique({ where: { id } });
    const additionalInfo = positionRequest.additional_info as AdditionalInfo | null;

    const classification = await this.prisma.classification.findUnique({
      where: { id: positionRequest.classification_id },
    });
    const paylist_department = await this.prisma.department.findUnique({
      select: { id: true, organization: { select: { id: true } } },
      where: { id: additionalInfo.department_id },
    });

    let data: PositionCreateInput;

    switch (classification.employee_group_id) {
      case 'MGT':
        data = {
          BUSINESS_UNIT: paylist_department.organization.id,
          DEPTID: paylist_department.id,
          JOBCODE: positionRequest.classification_id,
          REPORTS_TO: positionRequest.reports_to_position_id,
          POSN_STATUS: positionRequestNeedsReview.result === true ? PositionStatus.Proposed : PositionStatus.Active,
          DESCR: positionRequest.title,
          REG_TEMP: PositionDuration.Regular,
          FULL_PART_TIME: PositionType.FullTime,
        };
        break;
      case 'GEU':
      case 'OEX':
      case 'PEA': {
        const employees = (
          await this.peoplesoftService.getEmployeesForPositions([additionalInfo.excluded_mgr_position_number])
        ).get(additionalInfo.excluded_mgr_position_number);
        const employeeId = employees.length > 0 ? employees[0].id : null;

        data = {
          BUSINESS_UNIT: paylist_department.organization.id,
          DEPTID: paylist_department.id,
          JOBCODE: positionRequest.classification_id,
          REPORTS_TO: positionRequest.reports_to_position_id,
          POSN_STATUS: positionRequestNeedsReview.result === true ? PositionStatus.Proposed : PositionStatus.Active,
          DESCR: positionRequest.title,
          REG_TEMP: PositionDuration.Regular,
          FULL_PART_TIME: PositionType.FullTime,
          TGB_E_CLASS: `P${(positionRequest.profile_json as Record<string, any>).number}`,
          TGB_APPRV_MGR: employeeId,
        };

        break;
      }
    }

    const position = await this.peoplesoftService.createPosition(data);

    return position;
  }

  //deprecated
  async updatePositionRequestStatus(id: number, status: number) {
    return await this.crmService.updateIncidentStatus(id, status);
  }
}
