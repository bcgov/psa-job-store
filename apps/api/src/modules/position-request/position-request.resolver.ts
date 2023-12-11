import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  PositionRequest,
  PositionRequestCreateInput,
  PositionRequestUpdateInput,
} from '../../@generated/prisma-nestjs-graphql';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { FindManyPositionRequestWithSearch } from './args/find-many-position-request-with-search.args';
import { PositionRequestApiService, PositionRequestResponse } from './position-request.service';

@Resolver()
export class PositionRequestApiResolver {
  constructor(private positionRequestService: PositionRequestApiService) {}

  @Mutation(() => Int)
  async createPositionRequest(
    @CurrentUser() { id: userId }: Express.User,
    @Args({ name: 'data', type: () => PositionRequestCreateInput }) data: PositionRequestCreateInput,
  ) {
    // console.log('create DATA: ', data);

    // TODO: AL-146
    // data.user = { connect: { id: userId } };

    // TODO: AL-146 - replace below with above
    data.user_id = userId;

    const newPositionRequest = await this.positionRequestService.createPositionRequest(data);
    return newPositionRequest.id;
  }

  @Mutation(() => PositionRequestResponse)
  async updatePositionRequest(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateInput') updateInput: PositionRequestUpdateInput,
  ) {
    return this.positionRequestService.updatePositionRequest(id, updateInput);
  }

  @Query(() => Int, { name: 'positionRequestsCount' })
  async jobProfilesCount(
    @CurrentUser() { id: userId }: Express.User,
    @Args() args?: FindManyPositionRequestWithSearch,
  ) {
    return await this.positionRequestService.getPositionRequestCount(args, userId);
  }

  @Query(() => [PositionRequest], { name: 'positionRequests' })
  async getPositionRequests(
    @CurrentUser() { id: userId }: Express.User,
    @Args() args?: FindManyPositionRequestWithSearch,
  ) {
    return this.positionRequestService.getPositionRequests(args, userId);
  }

  @Query(() => PositionRequest, { name: 'positionRequest' })
  async getPositionRequest(@CurrentUser() { id: userId }: Express.User, @Args('id') id: number) {
    return this.positionRequestService.getPositionRequest(+id, userId);
  }

  @Query(() => PositionRequest, { name: 'positionRequest' })
  async getPositionRequestUserClassifications(@CurrentUser() { id: userId }: Express.User) {
    return this.positionRequestService.getPositionRequestUserClassifications(userId);
  }
}
