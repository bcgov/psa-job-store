import { Injectable } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { diff_match_patch } from 'diff-match-patch';
import GraphQLJSON from 'graphql-type-json';
import {
  PositionRequestCreateInput,
  PositionRequestStatus,
  PositionRequestUpdateInput,
  PositionRequestWhereInput,
  UuidFilter,
} from '../../@generated/prisma-nestjs-graphql';
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
  inReview: number;

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  escalatedCount: number;

  @Field(() => Int)
  actionRequiredCount: number;
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
  // ...(searchResultIds != null && { id: { in: searchResultIds } }),

  constructor(
    private readonly classificationService: ClassificationService,
    private readonly crmService: CrmService,
    private readonly peoplesoftService: PeoplesoftService,
    private readonly prisma: PrismaService,
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
    throw new Error('Failed to generate a unique ID');
  }

  async createPositionRequest(data: PositionRequestCreateInput, userId: string) {
    const uniqueSubmissionId = await this.generateUniqueShortId(10);

    return this.prisma.positionRequest.create({
      data: {
        department: data.department,
        step: data.step,
        reports_to_position_id: data.reports_to_position_id,
        profile_json: data.profile_json,
        orgchart_json: data.orgchart_json,
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

  convertIncidentStatusToPositionRequestStatus = (incident: Record<string, any>) => {
    switch (incident.statusWithType.status.id) {
      case IncidentStatus.Solved:
      case IncidentStatus.SolvedTraining:
        return PositionRequestStatus.COMPLETED;
      case IncidentStatus.Unresolved:
      case IncidentStatus.Updated:
        return PositionRequestStatus.IN_REVIEW;
      case IncidentStatus.WaitingClient:
        return PositionRequestStatus.ACTION_REQUIRED;
      case IncidentStatus.WaitingInternal:
        return PositionRequestStatus.ESCALATED;
      default:
        // Don't update status if not covered by the above
        return null;
    }
  };

  async submitPositionRequest(id: number) {
    let positionRequest = await this.prisma.positionRequest.findUnique({ where: { id } });

    const position = await this.createPositionForPositionRequest(id);

    if (position.positionNbr.length > 0) {
      positionRequest = await this.prisma.positionRequest.update({
        where: { id },
        data: {
          position_number: +position.positionNbr,
        },
      });
    }

    // CRM Incident Management
    const incident = await this.createOrUpdateCrmIncidentForPositionRequest(id);
    // console.log('incident: ', incident);
    positionRequest = await this.prisma.positionRequest.update({
      where: { id },
      data: {
        crm_id: incident.id,
        status: this.convertIncidentStatusToPositionRequestStatus(incident),
      },
    });

    return positionRequest;
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
    return mergedResults; //.reverse();
  }

  async getPositionRequest(id: number, userId: string, userRoles: string[] = []) {
    // console.log('getPositionRequest!', userRoles);
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
    const inReviewCount = await getCountForStatus(PositionRequestStatus.IN_REVIEW);
    const escalatedCount = await getCountForStatus(PositionRequestStatus.ESCALATED);
    const actionRequiredCount = await getCountForStatus(PositionRequestStatus.ACTION_REQUIRED);

    // Return the counts
    return {
      draft: draftCount,
      completed: completedCount,
      inReview: inReviewCount,
      escalatedCount: escalatedCount,
      actionRequiredCount: actionRequiredCount,
      total: draftCount + completedCount + inReviewCount + escalatedCount + actionRequiredCount,
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
    const classificationIds = [...new Set(positionRequests.map((pr) => pr.classification_id))];

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

  async updatePositionRequest(id: number, updateData: PositionRequestUpdateInput) {
    // todo: AL-146 - tried to do this with a spread operator, but getting an error
    const updatePayload: any = {};

    if (updateData.step !== undefined) {
      updatePayload.step = updateData.step;
    }

    if (updateData.reports_to_position_id !== undefined) {
      updatePayload.reports_to_position_id = updateData.reports_to_position_id;
    }

    // Position # is _never_ set by client
    // if (updateData.position_number !== undefined) {
    //   updatePayload.position_number = updateData.position_number;
    // }

    if (updateData.profile_json !== undefined) {
      updatePayload.profile_json = updateData.profile_json;
    }

    if (updateData.orgchart_json !== undefined) {
      updatePayload.orgchart_json = updateData.orgchart_json;
    }

    if (updateData.title !== undefined) {
      updatePayload.title = updateData.title;
    }

    // if (updateData.classification !== undefined) {
    //   updatePayload.classification = updateData.classification;
    // }

    if (updateData.classification_id !== undefined) {
      updatePayload.classification_id = updateData.classification_id;
    }

    if (updateData.status !== undefined) {
      updatePayload.status = updateData.status;
    }

    if (updateData.parent_job_profile !== undefined) {
      updatePayload.parent_job_profile = { connect: { id: updateData.parent_job_profile.connect.id } };
    }

    if (updateData.department !== undefined) {
      updatePayload.department = { connect: { id: updateData.department.connect.id } };
    }

    // additional information form data:

    if (updateData.additional_info_excluded_mgr_position_number !== undefined) {
      updatePayload.additional_info_excluded_mgr_position_number =
        updateData.additional_info_excluded_mgr_position_number;
    }

    if (updateData.additional_info_comments !== undefined) {
      updatePayload.additional_info_comments = updateData.additional_info_comments;
    }

    if (updateData.workLocation !== undefined) {
      updatePayload.workLocation = { connect: { id: updateData.workLocation.connect.id } };
    }

    if (updateData.paylist_department !== undefined) {
      updatePayload.paylist_department = { connect: { id: updateData.paylist_department.connect.id } };
    }

    // First pass updates
    const positionRequest = await this.prisma.positionRequest.update({
      where: { id: id },
      data: updatePayload,
    });

    return positionRequest;
  }

  async deletePositionRequest(id: number) {
    const result = await this.prisma.positionRequest.delete({ where: { id } });
    return result;
  }

  async positionRequestNeedsReview(id: number) {
    const reasons = [];
    const positionRequest = await this.prisma.positionRequest.findUnique({ where: { id: id } });
    const jobProfile = await this.prisma.jobProfile.findUnique({
      where: { id: positionRequest.parent_job_profile_id },
    });

    // If the Job Profile is denoted as requiring review, it _must_ be reviewed every time
    if (jobProfile.review_required === true) {
      reasons.push('Job Profile is denoted as requiring review');
      return { result: true, reasons: reasons };
    }

    // If the job profile is _not_ denoted as requiring review, it must be reviewed _only_ if significant sections have been changed
    const prJobProfile = positionRequest.profile_json as Record<string, any>;

    // Find position request job profile signficant sections
    const prJobProfileSignificantSections = {
      accountabilities: prJobProfile.accountabilities
        .filter(
          (obj) =>
            obj.is_significant === true && (Object.keys(obj).indexOf('disabled') === -1 || obj.disabled === false),
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
      ),
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

    return { result: significantSectionChanges.some((value) => value === true), reasons: reasons };
  }

  async createOrUpdateCrmIncidentForPositionRequest(id: number) {
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
      throw new Error('CRM Contact ID not found');
    }

    const department = await this.prisma.department.findUnique({ where: { id: positionRequest.department_id } });
    const location = await this.prisma.location.findUnique({ where: { id: department.location_id } });
    const parentJobProfile = await this.prisma.jobProfile.findUnique({
      where: { id: positionRequest.parent_job_profile_id },
    });

    const data: IncidentCreateUpdateInput = {
      subject: `Position Number Request - ${classification.code}`,
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
        id: 1460,
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
            id: IncidentThreadEntryType.Customer,
          },
          text: `
          <ul>
            <li>Have you received executive approval (Depuity Minister or delegate) for this new position?    Yes</li>
            <li>What is the effective date?    ${dayjs().format('MMM D, YYYY')}</li>
            <li>What is the pay list/department ID number?    ${positionRequest.department_id}</li>
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
          `,
        },
      ],
      fileAttachments: [],
    };

    let incident: Record<string, any> = {};
    if (positionRequest.crm_id === null) {
      incident = await this.crmService.createIncident(data);
    } else {
      await this.crmService.updateIncident(positionRequest.crm_id, data);
      incident = await this.crmService.getIncident(positionRequest.crm_id);
    }

    return incident;
  }

  async createPositionForPositionRequest(id: number) {
    const positionRequestNeedsReview = await this.positionRequestNeedsReview(id);

    const positionRequest = await this.prisma.positionRequest.findUnique({ where: { id } });
    const classification = await this.prisma.classification.findUnique({
      where: { id: positionRequest.classification_id },
    });
    const department = await this.prisma.department.findUnique({
      select: { organization: { select: { id: true } } },
      where: { id: positionRequest.department_id },
    });

    let data: PositionCreateInput;

    switch (classification.employee_group_id) {
      case 'MGT':
        data = {
          BUSINESS_UNIT: department.organization.id,
          DEPTID: positionRequest.department_id,
          JOBCODE: positionRequest.classification_id,
          REPORTS_TO: positionRequest.reports_to_position_id,
          POSN_STATUS: positionRequestNeedsReview ? PositionStatus.Proposed : PositionStatus.Active,
          DESCR: positionRequest.title,
          REG_TEMP: PositionDuration.Regular,
          FULL_PART_TIME: PositionType.FullTime,
        };
        break;
      case 'GEU':
      case 'OEX':
      case 'PEA': {
        const employees = (
          await this.peoplesoftService.getEmployeesForPositions([
            positionRequest.additional_info_excluded_mgr_position_number,
          ])
        ).get(positionRequest.additional_info_excluded_mgr_position_number);
        const employeeId = employees.length > 0 ? employees[0].id : null;

        data = {
          BUSINESS_UNIT: department.organization.id,
          DEPTID: positionRequest.department_id,
          JOBCODE: positionRequest.classification_id,
          REPORTS_TO: positionRequest.reports_to_position_id,
          POSN_STATUS: positionRequestNeedsReview ? PositionStatus.Proposed : PositionStatus.Active,
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
}
