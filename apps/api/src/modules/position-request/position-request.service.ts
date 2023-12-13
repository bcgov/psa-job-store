import { Injectable } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { PositionRequestCreateInput, PositionRequestUpdateInput } from '../../@generated/prisma-nestjs-graphql';
import { PrismaService } from '../prisma/prisma.service';
import { FindManyPositionRequestWithSearch } from './args/find-many-position-request-with-search.args';

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
}

@Injectable()
export class PositionRequestApiService {
  // ...(searchResultIds != null && { id: { in: searchResultIds } }),

  constructor(private readonly prisma: PrismaService) {}

  async createPositionRequest(data: PositionRequestCreateInput, userId: string) {
    return this.prisma.positionRequest.create({
      data: {
        step: data.step,
        reports_to_position_id: data.reports_to_position_id,
        profile_json: data.profile_json,
        // TODO: AL-146
        // user: data.user,
        user_id: userId,
        parent_job_profile: data.parent_job_profile,
        submission_id: 'SUBM_ID',
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
  async getPositionRequests({ search, where, ...args }: FindManyPositionRequestWithSearch, userId: string) {
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

    const positionRequests = await this.prisma.positionRequest.findMany({
      where: {
        ...searchConditions,
        ...where,
        user_id: userId,
      },
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
      },
    });

    // todo: AL-146 this should not be needed if the foreign key relationship is working properly in schema.prisma

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

    // Create a map for easy lookup
    const classificationMap = new Map(classifications.map((c) => [c.id, c.code]));

    // Merge position requests with classification codes
    const mergedResults = positionRequests.map((pr) => ({
      ...pr,
      classification_code: classificationMap.get(pr.classification_id),
    }));

    return mergedResults; //.reverse();
  }

  async getPositionRequest(id: number, userId: string) {
    return this.prisma.positionRequest.findUnique({
      where: { id: id, user_id: userId },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getPositionRequestCount({ search, where }: FindManyPositionRequestWithSearch, userId: string) {
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

    return await this.prisma.positionRequest.count({
      where: {
        ...searchConditions,
        user_id: userId,
        ...where,
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    // ...add similar checks for other fields...

    return this.prisma.positionRequest.update({
      where: { id: id },
      data: updatePayload,
    });
  }
}
