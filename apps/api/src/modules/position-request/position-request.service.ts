import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PositionRequest, Prisma } from '@prisma/client';
import {
  Elements,
  autolayout,
  generateJobProfile,
  getALStatus,
  updateSupervisorAndAddNewPositionNode,
} from 'common-kit';
import dayjs from 'dayjs';
import { diff_match_patch } from 'diff-match-patch';
import { Packer } from 'docx';
import GraphQLJSON from 'graphql-type-json';
import {
  PositionRequestStatus,
  PositionRequestUpdateInput,
  PositionRequestWhereInput,
  User,
  UuidFilter,
} from '../../@generated/prisma-nestjs-graphql';
import { AlexandriaError, AlexandriaErrorClass } from '../../utils/alexandria-error';
import { ClassificationService } from '../external/classification.service';
import { CrmService } from '../external/crm.service';
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
import { DepartmentService } from '../organization/department/department.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { ExtendedFindManyPositionRequestWithSearch } from './args/find-many-position-request-with-search.args';
import {
  PositionRequestCreateInputWithoutUser,
  RequestingFeature,
  SuggestedManager,
} from './position-request.resolver';

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

  @Field(() => Int)
  cancelledCount: number;
}

interface AdditionalInfo {
  work_location_id?: string;
  work_location_name?: string;
  department_id?: string;
  excluded_mgr_position_number?: string;
  branch?: string;
  division?: string;
  excluded_mgr_name?: string;
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
    private readonly configService: ConfigService,
    private readonly crmService: CrmService,
    private readonly departmentService: DepartmentService,
    private readonly peoplesoftService: PeoplesoftService,
    private readonly prisma: PrismaService,
    private readonly positionService: PositionService,
    private readonly jobProfileService: JobProfileService,
    private readonly userService: UserService,
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

  async createPositionRequest(data: PositionRequestCreateInputWithoutUser) {
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
        user: data.user,
        parent_job_profile: data.parent_job_profile,
        submission_id: uniqueSubmissionId,
        status: 'DRAFT',
        title: data.title,
        classification: data.classification,
      } as any as Prisma.PositionRequestCreateInput, // To prevent Excessive Stack Depth error,
    });
  }

  async submitPositionRequest(id: number, comment: string, userId: string, orgchart_png: string) {
    let positionRequest = await this.prisma.positionRequest.findUnique({ where: { id } });

    if (!positionRequest) throw AlexandriaError('Position request not found');

    // ensure comments are saved
    try {
      if (comment != null && comment.length > 0) {
        //  const c =
        await this.prisma.comment.create({
          data: {
            author_id: userId,
            record_id: positionRequest.id,
            record_type: 'PositionRequest',
            text: comment,
          },
        });
        // console.log('comment ', c);
      }
    } catch (error) {
      this.logger.error(error);
      throw AlexandriaError('Failed to save comments');
    }

    try {
      // there is no position number associated with this position request - create position in peoplesoft
      if (positionRequest.position_number == null) {
        // in testmode, we can skip the peoplesoft call to create position
        let position, positionRequestNeedsReview;
        try {
          if (this.configService.get('TEST_ENV') === 'true') {
            positionRequestNeedsReview = (await this.positionRequestNeedsReview(id)).result;

            if (positionRequestNeedsReview === true)
              position = { positionNbr: '00142558' }; // 00142558 is proposed (for verification required test)
            else position = { positionNbr: '00132136' }; // this position needs to be in approved status in order to have valid final state
          } else {
            // note this returns data with this format (string with leading zeros): { positionNbr: '00132136', errMessage: '' }
            [position, positionRequestNeedsReview] = await this.createPositionForPositionRequest(id);
          }
        } catch (error) {
          this.logger.error(error);
          throw AlexandriaError('Failed to create position in Peoplesoft');
        }

        // write position number back to position request immidietely to prevent data loss and duplicate position creation
        // also set submitted_at date
        try {
          positionRequest = await this.prisma.positionRequest.update({
            where: { id },
            data: {
              approval_type: positionRequestNeedsReview ? 'VERIFIED' : 'AUTOMATIC',
              position_number: +position.positionNbr,
              submitted_at: dayjs().toDate(),
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
            orgchart_png,
            comment,
          );
        } else {
          throw AlexandriaError('Peoplesoft returned a blank position number');
        }
      } else {
        // we already have a position number assigned to this position request
        // this happens if something went wrong previously and we did not get to changing the status of this position request
        // or if user is re-submitting after CS requested HM to make changes

        // check crm status etc

        // update submitted_at
        // try {
        //   positionRequest = await this.prisma.positionRequest.update({
        //     where: { id },
        //     data: {
        //       submitted_at: dayjs().toDate(),
        //     },
        //   });
        // } catch (error) {
        //   this.logger.error('Failed to update submitted_at: ' + positionRequest.position_number.toString());
        //   this.logger.error(error);
        // }

        positionRequest = await this.submitPositionRequest_afterCreatePosition(
          `${positionRequest.position_number.toString()}`.padStart(8, '0'),
          id,
          positionRequest,
          orgchart_png,
          comment,
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

  private async submitPositionRequest_afterCreatePosition(
    positionNumber: string,
    id,
    positionRequest: PositionRequest,
    orgchart_png,
    comment,
  ) {
    // this function runs after a position has been created in peoplesoft
    // we're going to update org chart (update supervisor and add new position nodes),
    // create or update CRM incident, and update position request status

    // retrieve position we just created from peoplesoft
    let positionObj: Record<string, any> | null;
    try {
      // console.log('getting position from peoplesoft: ', positionNumber);

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

    try {
      const reportsTo = (
        await this.positionService.getPositionProfile(positionRequest.reports_to_position_id, true)
      )[0];
      let excludedMgr;
      const additionalInfo = positionRequest.additional_info as Record<string, any>;
      const positionNumber = additionalInfo.excluded_mgr_position_number;
      const managerName = additionalInfo.excluded_mgr_name;

      // Get all position profiles for the position number
      const positionProfiles = await this.positionService.getPositionProfile(positionNumber, true);

      if (positionProfiles.length > 0) {
        if (managerName) {
          // Find the specific profile matching the manager name
          excludedMgr = positionProfiles.find((profile) => profile.employeeName === managerName);
          // If no match found, use the first profile as fallback
          if (!excludedMgr) {
            excludedMgr = positionProfiles[0];
          }
        } else {
          // Legacy case - use the first profile
          excludedMgr = positionProfiles[0];
        }
      }

      await this.prisma.positionRequest.update({
        where: { id },
        data: {
          reports_to_position: reportsTo,
          excluded_manager_position: excludedMgr,
          resubmitted_at: new Date(),
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw AlexandriaError('Failed to update manager information.');
    }

    // CRM Incident Managements
    let crm_id;
    let crm_lookup_name;
    let crm_status;
    let crm_category;
    try {
      const incident = await this.createOrUpdateCrmIncidentForPositionRequest(id, orgchart_png, comment);
      ({ crm_id, crm_lookup_name, crm_status, crm_category } = incident);
      await this.prisma.positionRequest.update({
        where: { id },
        data: {
          crm_id: +incident.crm_id,
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
      // console.log('getALStatus args: ', {
      //   category: crm_category,
      //   crm_status: crm_status,
      //   ps_status: positionObj['A.POSN_STATUS'],
      //   ps_effective_status: positionObj['A.EFF_STATUS'],
      // });

      // console.log('positionObj: ', positionObj);

      const incomingPositionRequestStatus = getALStatus({
        category: crm_category,
        crm_status: crm_status,
        ps_status: positionObj['A.POSN_STATUS'],
        ps_effective_status: positionObj['A.EFF_STATUS'],
      });

      if (incomingPositionRequestStatus === 'UNKNOWN') {
        this.logger.warn(
          `Failed to map to an internal status for position request id ${id}: crm_id: ${crm_id}, crm_lookup_name: ${crm_lookup_name}, crm status:  ${crm_status}, crm category: ${crm_category}, ps status: ${positionObj['A.POSN_STATUS']}, positionNumber: ${positionNumber}`,
        );
        // incomingPositionRequestStatus = 'DRAFT';
        throw AlexandriaError('Unexpected error occured while creating position request.');
      }

      // we will potentially create PRs with UNKNOWN status if there is an issue with CRM or PS creation
      // if status is completed, update approved_at date
      const status = incomingPositionRequestStatus as PositionRequestStatus;
      const approved_at = status === 'COMPLETED' ? dayjs().toDate() : null;
      return await this.prisma.positionRequest.update({
        where: { id },
        data: {
          status: status,
          ...(approved_at === null ? {} : { approved_at }),
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

  private async submitPositionRequest_updateOrgChart(positionObj, positionRequest: PositionRequest, id) {
    // get classification for this new position
    const classification = await this.classificationService.getClassificationForPeoplesoftPosition(positionObj);

    // console.log('positionObj: ', positionObj);

    // get department in which this position was created
    const department = await this.departmentService.getDepartment({ where: { id: positionObj['A.DEPTID'] } });
    const { edges, nodes } = positionRequest.orgchart_json as Record<string, any> as Elements;

    const excludedManagerId = (positionRequest.additional_info as AdditionalInfo | null)?.excluded_mgr_position_number;
    const supervisorId = positionObj['A.REPORTS_TO'];
    const positionNumber = positionObj['A.POSITION_NBR'];
    const positionTitle = positionObj['A.DESCR'];

    // remove node with isNewPosition = true (exists on new position requests, doesn't on older ones)
    // updateSupervisorAndAddNewPositionNode will re-add it with updated data
    const nodesWithNoNewPosition = nodes.filter((node) => !node.data.isNewPosition);

    // remove edge related to the new position, if exists
    const newEdgeId = `${positionRequest.reports_to_position_id}-000000`;
    const edgesWithNoNewPosition = edges.filter((edge) => edge.id !== newEdgeId);

    const { edges: newEdges, nodes: newNodes } = updateSupervisorAndAddNewPositionNode(
      edgesWithNoNewPosition,
      nodesWithNoNewPosition,
      excludedManagerId,
      supervisorId,
      positionNumber,
      positionTitle,
      classification,
      department,
    );

    const elementsData: Elements = {
      edges: newEdges,
      nodes: newNodes,
    };

    const orgchart_json = autolayout(elementsData) as any;

    //write org chart changes
    const positionRequestNew = await this.prisma.positionRequest.update({
      where: { id },
      data: {
        orgchart_json: orgchart_json,
      },
    });
    return positionRequestNew;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getPositionRequests(
    { search, where, ...args }: ExtendedFindManyPositionRequestWithSearch,
    userId: string,
    userRoles: string[] = [],
    requestingFeature?: RequestingFeature | null,
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

    // 'classificationTasks'|'myPositions'|'totalCompApprovedRequests'

    // console.log('whereConditions: ', JSON.stringify(whereConditions));
    // If the user has the "total-compensation" role and wants only completed requests for all users
    if (userRoles.includes('total-compensation') && requestingFeature === 'totalCompApprovedRequests') {
      whereConditions = {
        ...whereConditions,
        status: { equals: 'COMPLETED' },
      };
      // If the user is in "classification" role, then return only requests assigned to this user using classificationAssignedTo property
    } else if (userRoles.includes('classification') && requestingFeature === 'classificationTasks') {
      whereConditions = {
        ...whereConditions,
        status: { not: { equals: 'DRAFT' } },
      };
    } else if (requestingFeature === 'myPositions' || !requestingFeature) {
      // Default behavior for other users - get position requests for the current user only
      whereConditions = {
        ...whereConditions,
        user_id: { equals: userId },
      };
    }

    // Prepare orderBy
    const orderBy = (args.orderBy as any[]) || [];

    // Add default sorting by id
    orderBy.push({ id: 'desc' });

    // console.log('final whereConditions: ', JSON.stringify(whereConditions));

    const positionRequests = await this.prisma.positionRequest.findMany({
      where: whereConditions,
      orderBy,
      take: args.take,
      skip: args.skip,
      select: {
        id: true,
        parent_job_profile_id: true,
        step: true,
        reports_to_position_id: true,
        user_id: true,
        title: true,
        position_number: true,
        classification_id: true,
        classification_employee_group_id: true,
        classification_peoplesoft_id: true,
        submission_id: true,
        status: true,
        updated_at: true,
        resubmitted_at: true,
        parent_job_profile: true,
        approved_at: true,
        submitted_at: true,
        approval_type: true,
        time_to_approve: true,
        crm_id: true,
        crm_lookup_name: true,
        shareUUID: true,
        additional_info: true,
        classification: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return positionRequests;
  }

  async getSharedPositionRequest(shareUUID: string) {
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
          classification: {
            select: {
              code: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    } catch (error) {
      throw AlexandriaError('Invalid share URL');
    }

    if (!positionRequest) {
      return null;
    }

    return positionRequest;
  }

  async getPositionRequestByNumber(positionNumber: number, userId: string, userRoles: string[] = []) {
    PositionRequestStatus.COMPLETED;
    const positionRequest = await this.prisma.positionRequest.findMany({
      where: {
        position_number: { equals: positionNumber },
        status: {
          in: [PositionRequestStatus.COMPLETED, PositionRequestStatus.VERIFICATION, PositionRequestStatus.REVIEW],
        },
      },
    });
    return positionRequest.length ? positionRequest[0].id : null;
  }

  async getPositionRequestForDept(id: number, userId: string) {
    let whereCondition: {
      id: number;
      user_id?: UuidFilter;
      OR?: Array<PositionRequestWhereInput>;
      NOT?: Array<PositionRequestWhereInput>;
    } = { id };
    const user: User = await this.userService.getUser({ where: { id: userId } });
    console.log(user.metadata.org_chart.department_ids);

    whereCondition = {
      ...whereCondition,

      OR: [
        { user_id: { equals: userId } },
        {
          AND: [
            { department_id: { in: user.metadata.org_chart.department_ids } },
            {
              status: {
                in: [PositionRequestStatus.COMPLETED, PositionRequestStatus.VERIFICATION, PositionRequestStatus.REVIEW],
              },
            },
          ],
        },
      ],

      //user_id: { equals: userId },
      ///   dept_id: ]// SAME DEPT AND status: {
      //   in: [PositionRequestStatus.COMPLETED, PositionRequestStatus.VERIFICATION, PositionRequestStatus.REVIEW],
      // }
    };

    const positionRequest = await this.prisma.positionRequest.findUnique({
      where: whereCondition,
      include: {
        parent_job_profile: true,
        classification: {
          select: {
            id: true,
            code: true,
            employee_group_id: true,
            peoplesoft_id: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!positionRequest) {
      return null;
    }

    return {
      ...positionRequest,
      classification_employee_group_id: positionRequest.classification?.employee_group_id,
      classification_peoplesoft_id: positionRequest.classification?.peoplesoft_id,
    };
  }

  async getPositionRequest(id: number, userId: string, userRoles: string[] = []) {
    let whereCondition: { id: number; user_id?: UuidFilter; NOT?: Array<PositionRequestWhereInput> } = { id };

    if (['classification', 'total-compensation'].some((value) => userRoles.includes(value))) {
      whereCondition = { ...whereCondition };
    } else {
      whereCondition = {
        ...whereCondition,
        user_id: { equals: userId }, //OR SAME DEPT AND status: {
        //   in: [PositionRequestStatus.COMPLETED, PositionRequestStatus.VERIFICATION, PositionRequestStatus.REVIEW],
        // }
      };
    }

    const positionRequest = await this.prisma.positionRequest.findUnique({
      where: whereCondition,
      include: {
        parent_job_profile: true,
        classification: {
          select: {
            id: true,
            code: true,
            employee_group_id: true,
            peoplesoft_id: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!positionRequest) {
      return null;
    }

    return {
      ...positionRequest,
      classification_employee_group_id: positionRequest.classification?.employee_group_id,
      classification_peoplesoft_id: positionRequest.classification?.peoplesoft_id,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getPositionRequestCount(
    { search, where }: ExtendedFindManyPositionRequestWithSearch,
    userId: string,
    userRoles: string[] = [],
    requestingFeature?: RequestingFeature | null,
  ): Promise<PositionRequestStatusCounts> {
    let searchConditions = {};
    if (search) {
      searchConditions = {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { submission_id: { contains: search, mode: 'insensitive' } },
        ],
      };
    }

    const whereConditions = {
      ...searchConditions,
      ...where,
    };

    // Initial phase: Set up status filtering
    if (userRoles.includes('total-compensation') && requestingFeature === 'totalCompApprovedRequests') {
      whereConditions.status = { equals: 'COMPLETED' };
    } else if (userRoles.includes('classification') && requestingFeature === 'classificationTasks') {
      whereConditions.status = { not: { equals: 'DRAFT' } };
    } else if (requestingFeature === 'myPositions' || !requestingFeature) {
      whereConditions.user_id = { equals: userId };
    }

    // Store the initial status condition
    const initialStatusCondition = whereConditions.status;

    // Function to get count for a specific status, respecting initial filter
    const getCountForStatus = async (status: PositionRequestStatus) => {
      const statusFilter = initialStatusCondition ? { ...initialStatusCondition, equals: status } : { equals: status };

      return await this.prisma.positionRequest.count({
        where: {
          ...whereConditions,
          status: statusFilter,
        },
      });
    };

    // Get counts for each status
    const draftCount = await getCountForStatus(PositionRequestStatus.DRAFT);
    const completedCount = await getCountForStatus(PositionRequestStatus.COMPLETED);
    const verificationCount = await getCountForStatus(PositionRequestStatus.VERIFICATION);
    const reviewCount = await getCountForStatus(PositionRequestStatus.REVIEW);
    const actionRequiredCount = await getCountForStatus(PositionRequestStatus.ACTION_REQUIRED);
    const cancelledCount = await getCountForStatus(PositionRequestStatus.CANCELLED);

    // Return the counts
    return {
      draft: draftCount,
      completed: completedCount,
      verification: verificationCount,
      reviewCount: reviewCount,
      actionRequiredCount: actionRequiredCount,
      cancelledCount: cancelledCount,
      total: draftCount + completedCount + verificationCount + reviewCount + actionRequiredCount + cancelledCount,
    };
  }

  async getPositionRequestUserClassifications(userId: string) {
    const classifications = await this.prisma.classification.findMany({
      where: {
        PositionRequest: {
          some: {
            user_id: userId,
          },
        },
      },
      select: {
        id: true,
        employee_group_id: true,
        peoplesoft_id: true,
        code: true,
      },
      distinct: ['id', 'employee_group_id', 'peoplesoft_id'],
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

  async getPositionRequestSubmittedBy(userRoles: string[] = [], requestingFeature: RequestingFeature) {
    const whereConditions: any = {
      PositionRequest: {
        some: {}, // This ensures we only get users who have submitted position requests
      },
    };

    if (userRoles.includes('total-compensation') && requestingFeature === 'totalCompApprovedRequests') {
      whereConditions.PositionRequest.some.status = { equals: 'COMPLETED' };
    } else if (userRoles.includes('classification') && requestingFeature === 'classificationTasks') {
      whereConditions.PositionRequest.some.status = { not: { equals: 'DRAFT' } };
    }

    const users = await this.prisma.user.findMany({
      where: whereConditions,
      select: {
        id: true,
        name: true,
      },
      distinct: ['id'], // This ensures we get unique users
    });

    return users;
  }

  async getPositionRequestClassifications() {
    const classifications = await this.prisma.classification.findMany({
      where: {
        PositionRequest: {
          some: {
            status: 'COMPLETED',
          },
        },
      },
      select: {
        id: true,
        employee_group_id: true,
        peoplesoft_id: true,
        code: true,
      },
      distinct: ['id', 'employee_group_id', 'peoplesoft_id'],
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

  async updatePositionRequest(id: number, updateData: PositionRequestUpdateInput, user_id: string) {
    // todo: AL-146 - tried to do this with a spread operator, but getting an error (todo: this can now be fixed)
    let updatingAdditionalInfo = false;
    const currentData = await this.getPositionRequest(id, user_id);
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
      // no longer need to do this, as profile versioning can now be used to retreive original profile
      // if (updateData.profile_json !== null) {
      //   const originalProfile = await this.jobProfileService.getJobProfile(
      //     updateData.profile_json.id,
      //     updateData.profile_json.version,
      //     userRoles,
      //   );
      //   updateData.profile_json.original_profile_json = originalProfile;
      // }
    }

    if (updateData.orgchart_json !== undefined) {
      updatePayload.orgchart_json = updateData.orgchart_json === null ? Prisma.DbNull : updateData.orgchart_json;
    }

    if (updateData.title !== undefined) {
      updatePayload.title = updateData.title;

      // update the title of the isNewPosition node in the org chart
      // this allows display of correct title on the node on the org chart when viewed via share link

      const positionRequest = await this.prisma.positionRequest.findUnique({
        where: { id: id },
        select: { orgchart_json: true },
      });

      const orgChart = positionRequest.orgchart_json;

      if (orgChart && typeof orgChart === 'object' && 'nodes' in orgChart) {
        const nodes = orgChart.nodes as any[];
        const isNewPositionNode = nodes.find((node) => node.data?.isNewPosition === true);
        if (isNewPositionNode) {
          isNewPositionNode.data.title = updateData.title;
        }
        updatePayload.orgchart_json = orgChart;
      }
    }

    if (updateData.parent_job_profile !== undefined) {
      if (updateData.parent_job_profile.connect.id_version == null) {
        updatePayload.parent_job_profile = { disconnect: true };
      } else {
        updatePayload.parent_job_profile = {
          connect: {
            id_version: {
              id: updateData.parent_job_profile.connect.id_version.id,
              version: updateData.parent_job_profile.connect.id_version.version,
            },
          },
        };

        const parentJobProfile = await this.jobProfileService.getJobProfile(
          updateData.parent_job_profile.connect.id_version.id,
          updateData.parent_job_profile.connect.id_version.version,
        );
        // if we have a department, try to filter for multiple classifications
        if (parentJobProfile?.classifications.length > 1) {
          const getClassification = async (parentJobProfile: any, department_id: string) => {
            const isExcluded = (await this.departmentService.getDepartment({ where: { id: department_id } })).metadata
              .is_statutorily_excluded;

            const classifications = parentJobProfile.classifications;
            return isExcluded
              ? classifications.filter((cl) => cl.classification_employee_group_id == 'OEX')
              : classifications.filter((cl) => cl.classification_employee_group_id != 'OEX');
          };
          const classifications = await getClassification(parentJobProfile, currentData.department_id);
          // Set Classification IDs on positionRequest
          updatePayload.classification = {
            connect: {
              id_employee_group_id_peoplesoft_id: {
                id: classifications[0].classification.id,
                employee_group_id: classifications[0].classification.employee_group_id,
                peoplesoft_id: classifications[0].classification.peoplesoft_id,
              },
            },
          };
        } else if (parentJobProfile?.classifications && parentJobProfile?.classifications.length > 0) {
          const classification = parentJobProfile.classifications[0].classification;
          updatePayload.classification = {
            connect: {
              id_employee_group_id_peoplesoft_id: {
                id: classification.id,
                employee_group_id: classification.employee_group_id,
                peoplesoft_id: classification.peoplesoft_id,
              },
            },
          };
        } else {
          // If there's no classification, disconnect the existing one
          updatePayload.classification = { disconnect: true };
        }
      }
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

      if (additionalInfo.excluded_mgr_name !== undefined) {
        (updatePayload.additional_info as Record<string, Prisma.JsonValue>).excluded_mgr_name =
          additionalInfo.excluded_mgr_name;
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

      if (additionalInfo.work_location_name !== undefined) {
        (updatePayload.additional_info as Record<string, Prisma.JsonValue>).work_location_name =
          additionalInfo.work_location_name;
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
          // const excludedNodes = (orgChart.nodes as any[]).filter((node) => node.data?.externalDepartment === true);
          // console.log('Excluded nodes:', excludedNodes);

          // Remove existing node with isExcludedManager = true
          // isExcludedManager indicates it's a custom added node
          let updatedNodes = (orgChart.nodes as any[]).filter((node) => node.data?.externalDepartment !== true);

          // const excludedEdges = (orgChart.edges as any[]).filter((edge) => {
          //   const sourceNode = (orgChart.nodes as any[]).find((node) => node.id === edge.source);
          //   const targetNode = (orgChart.nodes as any[]).find((node) => node.id === edge.target);
          //   return sourceNode?.data?.externalDepartment === true || targetNode?.data?.externalDepartment === true;
          // });
          // console.log('Excluded edges:', excludedEdges);

          const updatedEdges = (orgChart.edges as any[]).filter((edge) => {
            const sourceNode = (orgChart.nodes as any[]).find((node) => node.id === edge.source);
            const targetNode = (orgChart.nodes as any[]).find((node) => node.id === edge.target);
            return sourceNode?.data?.externalDepartment !== true && targetNode?.data?.externalDepartment !== true;
          });

          const isExcludedManagerInOrgChart = (orgChart.nodes as any[]).some(
            (node) => node.id === additionalInfo.excluded_mgr_position_number,
          );

          // excluded manager may not be in additional info, for example if user is using "Save and quit feature"
          // without filling that field
          const excludedManagerPresent = additionalInfo.excluded_mgr_position_number;

          // console.log('isExcludedManagerInOrgChart: ', isExcludedManagerInOrgChart);

          // excluded manager is not in the org chart, add it
          let updatedOrgChart: {
            edges: any[];
            nodes: any[];
          } = { edges: [], nodes: [] };
          if (!isExcludedManagerInOrgChart && excludedManagerPresent) {
            // console.log('isExcludedManagerInOrgChart false');

            const employeeInfo = await this.positionService.getPositionProfile(
              additionalInfo.excluded_mgr_position_number,
              true,
            );

            const topLevelPositionId = this.getTopLevelReportingChain(orgChart, positionRequest.reports_to_position_id);

            updatedOrgChart = {
              ...orgChart,
              nodes: [
                ...updatedNodes,
                {
                  id: additionalInfo.excluded_mgr_position_number,
                  data: {
                    id: additionalInfo.excluded_mgr_position_number,
                    title: employeeInfo[0].positionDescription,
                    isExcludedManager: true, // mark node as excluded manager
                    externalDepartment: true, // indicate this excluded manager is not part of the department
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
          } else if (excludedManagerPresent) {
            // excluded manager is in the org chart
            // we may still need to update the org chart in case user changed excluded manager from
            // excluded manager that was outside of the department to one being inside the department
            // so we need to remove that from org chart

            updatedOrgChart = {
              ...orgChart,
              nodes: [...updatedNodes],
              edges: [...updatedEdges],
            };
          }

          if (excludedManagerPresent) {
            // find the excluded manager node and mark it as excluded manager
            // unmark any other node that was previously marked as excluded manager
            updatedNodes = updatedOrgChart.nodes.map((node) => {
              if (node.id === additionalInfo.excluded_mgr_position_number) {
                // console.log('found excluded manager, marking..');
                return {
                  ...node,
                  data: {
                    ...node.data,
                    isExcludedManager: true,
                  },
                };
              } else {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    isExcludedManager: false,
                  },
                };
              }
            });

            updatedOrgChart = {
              ...orgChart,
              nodes: [...updatedNodes],
              edges: [...updatedOrgChart.edges],
            };

            updatePayload.orgchart_json = autolayout(updatedOrgChart) as {
              edges: any[];
              nodes: any[];
            };
          }

          // if updatePayload.additional_info.department_id is provided, update department_id on the node with isNewPosition == true
          // this way new position node will have correct department id when viewed in shared mode
          if (additionalInfo.department_id !== undefined) {
            updatedNodes = updatedNodes.map((node) => {
              if (node.data?.isNewPosition === true) {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    department: {
                      id: additionalInfo.department_id,
                      organization_id: additionalInfo.work_location_id,
                      name: additionalInfo.work_location_name,
                    },
                  },
                };
              } else {
                return node;
              }
            });
          }
        }
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
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        classification: true,
      },
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
      where: {
        id_version: { id: positionRequest.parent_job_profile_id, version: positionRequest.parent_job_profile_version },
      },
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
      professional_registration_requirements: prJobProfile.professional_registration_requirements
        .filter(
          (obj) =>
            obj.is_significant === true && (Object.keys(obj).indexOf('disabled') === -1 || obj.disabled === false),
        )
        .map((obj) => obj.text),
      security_screenings: prJobProfile.security_screenings
        // check for undefined and treat it as significant, since significant flag was added later
        // initially all security screenings were treated as significant
        .filter(
          (obj) =>
            (obj.is_significant === true || obj.is_significant === undefined) &&
            (Object.keys(obj).indexOf('disabled') === -1 || obj.disabled === false),
        )
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
      professional_registration_requirements:
        (jobProfile.professional_registration_requirements as Record<string, any>)
          ?.filter(
            (obj) =>
              obj.is_significant === true && (Object.keys(obj).indexOf('disabled') === -1 || obj.disabled === false),
          )
          ?.map((obj) => obj.text) ?? [],
      security_screenings: (jobProfile.security_screenings as Record<string, any>)
        // check for undefined and treat it as significant, since significant flag was added later
        // initially all security screenings were treated as significant
        .filter(
          (obj) =>
            (obj.is_significant === true || obj.is_significant === undefined) &&
            (Object.keys(obj).indexOf('disabled') === -1 || obj.disabled === false),
        )
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
      // Professional Registration Requirements
      this.dataHasChanges(
        JSON.stringify(jobProfileSignficantSections.professional_registration_requirements),
        JSON.stringify(prJobProfileSignificantSections.professional_registration_requirements),
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
        reasons.push('Changes in Professional Registration and Certification Requirements');
      }
      if (significantSectionChanges[4]) {
        reasons.push('Changes in Security Screenings');
      }
    }

    return {
      result: significantSectionChanges.some((value) => value === true) || profilesRequiresReview,
      reasons: reasons,
    };
  }

  async createOrUpdateCrmIncidentForPositionRequest(id: number, orgchartPng: string, comment: string) {
    try {
      const needsReview = (await this.positionRequestNeedsReview(id)).result;
      const formattedDate = dayjs().format('YYYYMMDD');
      const positionRequest = await this.prisma.positionRequest.findUnique({ where: { id } });
      const classification = await this.classificationService.getClassification({
        where: {
          id_employee_group_id_peoplesoft_id: {
            id: positionRequest.classification_id,
            employee_group_id: positionRequest.classification_employee_group_id,
            peoplesoft_id: positionRequest.classification_peoplesoft_id,
          },
        },
      });
      const { metadata } = await this.prisma.user.findUnique({ where: { id: positionRequest.user_id } });
      const contactId =
        ((metadata ?? {}) as Record<string, any>).crm?.contact_id ??
        (this.configService.get('TEST_ENV') === 'true' ? 231166 : null);

      // without contactId we cannot create an incident
      // this can happen if this is new staff member and they have not been assigned a CRM contact yet
      if (contactId === null) {
        throw AlexandriaError('CRM Contact ID not found');
      }

      const additionalInfo = positionRequest.additional_info as AdditionalInfo | null;

      // Fetch the parent job profile with its classification info
      const parentJobProfile = await this.prisma.jobProfile.findUnique({
        where: {
          id_version: {
            id: positionRequest.parent_job_profile_id,
            version: positionRequest.parent_job_profile_version,
          },
        },
        include: {
          classifications: {
            include: {
              classification: true,
            },
          },
        },
      });

      // Augment the profile data with classification info
      const jobProfile = {
        ...(positionRequest.profile_json as Record<string, any>),
        classifications: parentJobProfile.classifications,
      } as Record<string, any>;

      // const jobProfile = positionRequest.profile_json as Record<string, any>;
      const paylist_department = await this.prisma.department.findUnique({
        where: { id: additionalInfo.department_id },
      });
      const location = await this.prisma.location.findUnique({ where: { id: paylist_department.location_id } });
      const supervisorProfile = await this.positionService.getPositionProfile(
        additionalInfo.excluded_mgr_position_number.toString(),
      );

      const jobProfileDocument =
        positionRequest.profile_json != null
          ? generateJobProfile({
              jobProfile,
              positionRequest,
              supervisorProfile: supervisorProfile.length > 0 ? supervisorProfile[0] : null,
            })
          : null;
      const jobProfileBase64 = await Packer.toBase64String(jobProfileDocument);

      const zeroFilledPositionNumber =
        positionRequest.position_number != null ? String(positionRequest.position_number).padStart(8, '0') : null;

      const pngFileName = `Organization Chart ${zeroFilledPositionNumber} ${positionRequest.title} ${formattedDate}.png`;

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
            // if user is re-submitting, set crm status to updated, always
            id:
              positionRequest.status === PositionRequestStatus.ACTION_REQUIRED
                ? IncidentStatus.Updated
                : // if user is not resubmitting (submitting for the first time), set status based on needsReview
                  needsReview
                  ? IncidentStatus.Unresolved
                  : IncidentStatus.Solved,
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
            <a href="https://jobstore.gov.bc.ca/requests/positions/manage/${
              positionRequest.id
            }">View this position in the Job Store</a>
            <br />
            <strong>
            ${
              positionRequest.position_number != null
                ? `The ${
                    // if user is re-submitting, it means position was originally created in proposed state
                    // if not re-submitting, it depends on needsReview flag
                    positionRequest.status === PositionRequestStatus.ACTION_REQUIRED || needsReview === true
                      ? 'proposed'
                      : 'approved'
                  } position # is: ${zeroFilledPositionNumber}`
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
            (comment ?? '').length > 0
              ? `
          <br />
          <strong>The following note was added to this position request:</strong>
          <br />
          <em>${comment}</em> <br />`
              : ''
          }
          ${
            // user is re-submitting (so initially was requiring verification) but now selected a profile that does not reuqire review
            positionRequest.status === PositionRequestStatus.ACTION_REQUIRED && !needsReview
              ? `
          <strong>Note:</strong> User modified the profile such that it no longer requires a review. You still need to set the status of this request to 'Solved' and approve the position in PeopleSoft as usual.
          <br />
          `
              : ``
          }
          
            <ul>
              <li>Have you received executive approval (Depuity Minister or delegate) for this new position?    Yes</li>
              <li>What is the effective date?    ${dayjs().format('MMM D, YYYY')}</li>
              <li>What is the pay list/department ID number?    ${paylist_department.id}</li>
              <li>What is the expected classification level?    ${classification.code} (${classification.name})</li>
              <li>Is this position included or excluded?    ${
                classification.employee_group_id === 'MGT' || classification.employee_group_id === 'OEX'
                  ? 'Excluded'
                  : 'Included'
              }</li>
              <li>Is the position full-time or part-time?    Full-time</li>
              <li>What is the job title?    ${positionRequest.title}</li>
              <li>Is this a regular or temporary position?    Regular</li>
              <li>Who is the excluded manager who approved the profile?    ${
                positionRequest.reports_to_position_id
              }</li>
              <li>Where is the position location?    ${location.name}</li>
              <li>Which position number will the position report to?    ${positionRequest.reports_to_position_id}</li>
              <li>Is a Job Store profile being used? If so, what is the Job Store profile number?    ${
                jobProfile.number
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
          ...(orgchartPng && orgchartPng.trim() !== ''
            ? [
                {
                  name: 'Org chart',
                  fileName: pngFileName,
                  contentType: 'image/png',
                  data: orgchartPng,
                },
              ]
            : []),
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
      incident = await this.crmService.getIncident(
        positionRequest.crm_id != null ? positionRequest.crm_id : incident.id,
      );

      if (incident.crm_lookup_name != null) {
        await this.prisma.positionRequest.update({
          where: { id: positionRequest.id },
          data: {
            crm_lookup_name: incident.crm_lookup_name,
          },
        });
      }

      // console.log('incident is ', incident);

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

    const paylist_department = await this.prisma.department.findUnique({
      select: { id: true, organization: { select: { id: true } } },
      where: { id: additionalInfo.department_id },
    });

    // if excluded_mgr_position_number is not in a format like this '0123456 | First Last', then it's legacy, where it
    // was just the position number

    let excludedPositionNumber = '';
    let excludedEmployeeName = '';

    if (additionalInfo.excluded_mgr_position_number && additionalInfo.excluded_mgr_name) {
      // new format with separate position number and name
      excludedPositionNumber = additionalInfo.excluded_mgr_position_number;
      excludedEmployeeName = additionalInfo.excluded_mgr_name;
    } else {
      // legacy format, just the position number
      excludedPositionNumber = additionalInfo.excluded_mgr_position_number;
    }

    // console.log('excludedPositionNumber/Name: ', excludedPositionNumber, excludedEmployeeName);
    const employees = (await this.peoplesoftService.getEmployeesForPositions([excludedPositionNumber])).get(
      excludedPositionNumber,
    );

    // Filter employees based on name if available
    if (employees.length > 0) {
      if (excludedEmployeeName) {
        const employee = employees.find((employee) => employee.name === excludedEmployeeName);
        if (employee) {
          employees.splice(0, employees.length, employee);
        }
      } else {
        // if we have multiple employees and no name, use the first one
        employees.splice(0, employees.length, employees[0]);
      }
    }

    // console.log('employees: ', employees);

    const employeeId = employees.length > 0 ? employees[0].id : null;

    const data = {
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

    let position;
    try {
      position = await this.peoplesoftService.createPosition(data as PositionCreateInput);
      if (position.positionNbr == null || position.positionNbr === '') {
        this.logger.error('Failed to create position in PeopleSoft: ' + position.errMessage);
        throw AlexandriaError('Failed to create position in PeopleSoft');
      }
    } catch (error) {
      this.logger.error(error);
      throw AlexandriaError('Failed to create position in PeopleSoft');
    }

    return [position, positionRequestNeedsReview.result];
  }

  //deprecated
  async updatePositionRequestStatus(id: number, status: number) {
    return await this.crmService.updateIncidentStatus(id, status);
  }

  async getSuggestedManagers(positionNumber: string, positionRequestId: number): Promise<SuggestedManager[]> {
    // console.log('getSuggestedManagers: ', positionNumber, positionRequestId);

    const positionRequest = await this.prisma.positionRequest.findUnique({
      where: { id: positionRequestId },
      select: { orgchart_json: true, reports_to_position_id: true },
    });

    const orgChart = positionRequest.orgchart_json;
    // console.log('orgChart: ', orgChart);
    const managers: SuggestedManager[] = [];

    if (orgChart && typeof orgChart === 'object' && 'nodes' in orgChart && 'edges' in orgChart) {
      // Check the initial position first
      const initialNode = (orgChart.nodes as any[]).find((node: any) => node.id === positionNumber);
      if (initialNode && initialNode.data.classification.name.includes('Band')) {
        initialNode.data.employees.forEach((employee: any) => {
          managers.push({
            id: employee.id,
            name: employee.name,
            status: employee.status,
            positionNumber: initialNode.id,
            positionTitle: initialNode.data.title,
            classification: initialNode.data.classification,
            department: initialNode.data.department,
          });
        });
      }

      // Start traversing up from the given position
      let currentPositionId = positionNumber;

      while (true) {
        // Find the edge where the current position is the target
        const currentEdge = (orgChart.edges as any[]).find((edge: any) => edge.target === currentPositionId);

        if (!currentEdge) {
          break;
        }

        // Get the source node (manager's position)
        const managerNode = (orgChart.nodes as any[]).find((node: any) => node.id === currentEdge.source);

        if (!managerNode) {
          break;
        }

        // console.log('checking manager classification: ', managerNode.data.classification);
        // Check if the position's classification contains "Band"
        if (managerNode.data.classification.name.includes('Band')) {
          // Add all employees in this position to the managers array
          managerNode.data.employees.forEach((employee: any) => {
            managers.push({
              id: employee.id,
              name: employee.name,
              status: employee.status,
              positionNumber: managerNode.id,
              positionTitle: managerNode.data.title,
              classification: managerNode.data.classification,
              department: managerNode.data.department,
            });
          });
        }

        // Move up the chain
        currentPositionId = currentEdge.source;
      }
    }

    return managers;
  }
}
