import { Injectable } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import {
  PositionRequestCreateInput,
  PositionRequestStatus,
  PositionRequestUpdateInput,
} from '../../@generated/prisma-nestjs-graphql';
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

  constructor(private readonly prisma: PrismaService) {}

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
      },
      // include: {
      //   user: true,
      //   parent_job_profile: true,
      // },
    });
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
        status: { equals: 'IN_REVIEW' }, // todo: comment this out after testing session
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
    let whereCondition: { id: number; user_id?: string } = { id };

    // If the user does not have the "total-compensation" role, include the user_id in the where condition
    if (!userRoles.includes('total-compensation')) {
      whereCondition = { ...whereCondition, user_id: userId };
    }

    const positionRequest = await this.prisma.positionRequest.findUnique({
      where: whereCondition,
      include: {
        parent_job_profile: true,
      },
    });

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

    // Return the counts
    return {
      draft: draftCount,
      completed: completedCount,
      inReview: inReviewCount,
      total: draftCount + completedCount + inReviewCount,
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

  async updatePositionRequest(id: number, updateData: PositionRequestUpdateInput) {
    // todo: AL-146 - tried to do this with a spread operator, but getting an error
    const updatePayload: any = {};

    if (updateData.step !== undefined) {
      updatePayload.step = updateData.step;
    }

    if (updateData.reports_to_position_id !== undefined) {
      updatePayload.reports_to_position_id = updateData.reports_to_position_id;
    }

    if (updateData.position_number !== undefined) {
      updatePayload.position_number = updateData.position_number;
    }

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
      updatePayload.parent_job_profile = updateData.parent_job_profile;
    }

    if (updateData.department !== undefined) {
      updatePayload.department = updateData.department;
    }

    // ...add similar checks for other fields...

    return this.prisma.positionRequest.update({
      where: { id: id },
      data: updatePayload,
    });
  }
}
