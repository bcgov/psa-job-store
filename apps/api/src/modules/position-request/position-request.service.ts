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

  async createPositionRequest(data: PositionRequestCreateInput) {
    return this.prisma.positionRequest.create({
      data: {
        step: data.step,
        reports_to_position_id: data.reports_to_position_id,
        profile_json: data.profile_json,
        // TODO: AL-146
        // user: data.user,
        user_id: data.user_id,
        parent_job_profile: data.parent_job_profile,
        submission_id: 'SUBM_ID',
        status: 'DRAFT',
        title: data.title,
        classification: data.classification,
      },
      // include: {
      //   user: true,
      //   parent_job_profile: true,
      // },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getPositionRequests({ search, where, ...args }: FindManyPositionRequestWithSearch, userId: string) {
    return this.prisma.positionRequest.findMany({
      where: {
        ...where,
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
        classification: true,
        submission_id: true,
        status: true,
      },
    });
  }

  async getPositionRequest(id: number, userId: string) {
    return this.prisma.positionRequest.findUnique({
      where: { id: id, user_id: userId },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getPositionRequestCount({ search, where }: FindManyPositionRequestWithSearch, userId: string) {
    // const searchResultIds = search != null ? await this.searchService.searchJobProfiles(search) : null;

    return await this.prisma.positionRequest.count({
      where: {
        // ...(searchResultIds != null && { id: { in: searchResultIds } }),
        user_id: userId,
        ...where,
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getPositionRequestUserClassifications(userId: string) {
    throw new Error('Method not implemented.');
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

    if (updateData.profile_json !== undefined) {
      updatePayload.profile_json = updateData.profile_json;
    }

    if (updateData.title !== undefined) {
      updatePayload.title = updateData.title;
    }

    if (updateData.classification !== undefined) {
      updatePayload.classification = updateData.classification;
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
