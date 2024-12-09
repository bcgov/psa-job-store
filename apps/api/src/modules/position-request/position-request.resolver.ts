import { ConfigService } from '@nestjs/config';
import {
  Args,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  OmitType,
  Query,
  Resolver,
  registerEnumType,
} from '@nestjs/graphql';
import { UUID } from 'crypto';
import {
  PositionRequest,
  PositionRequestCreateInput,
  PositionRequestUpdateInput,
  UserCreateNestedOneWithoutPositionRequestInput,
} from '../../@generated/prisma-nestjs-graphql';
import { AppConfigDto } from '../../dtos/app-config.dto';
import { GqlCurrentUser } from '../auth/decorators/gql-current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { ExtendedFindManyPositionRequestWithSearch } from './args/find-many-position-request-with-search.args';
import {
  PositionRequestApiService,
  PositionRequestResponse,
  PositionRequestStatusCounts,
} from './position-request.service';

@ObjectType()
export class PositionNeedsReviewResult {
  @Field(() => Boolean)
  result: boolean;

  @Field(() => [String])
  reasons: string[];
}

@ObjectType()
export class PositionRequestUserClassification {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  employee_group_id!: string;

  @Field(() => String, { nullable: false })
  peoplesoft_id!: string;

  @Field(() => String, { nullable: false })
  code!: string;
}

@ObjectType()
class UserBasicInfo {
  @Field()
  id: UUID;

  @Field()
  name: string;
}

@ObjectType()
export class JobProfileStateType {
  @Field(() => String)
  state: string;
}

@ObjectType()
export class PositionRequestSubmittedBy {
  @Field()
  name: string;
}

@InputType()
export class PositionRequestCreateInputWithoutUser extends OmitType(PositionRequestCreateInput, ['user'] as const) {
  @Field(() => UserCreateNestedOneWithoutPositionRequestInput, { nullable: true })
  user?: UserCreateNestedOneWithoutPositionRequestInput;
}

export enum RequestingFeature {
  totalCompApprovedRequests = 'totalCompApprovedRequests',
  classificationTasks = 'classificationTasks',
  myPositions = 'myPositions',
}

registerEnumType(RequestingFeature, {
  name: 'RequestingFeature',
});

@ObjectType()
export class SuggestedManagerClassification {
  @Field(() => String)
  id: string;

  @Field(() => String)
  code: string;

  @Field(() => String)
  name: string;
}

@ObjectType()
export class SuggestedManagerDepartment {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  organization_id: string;
}

@ObjectType()
export class SuggestedManager {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  status: string;

  @Field(() => String)
  positionNumber: string;

  @Field(() => String)
  positionTitle: string;

  @Field(() => SuggestedManagerClassification)
  classification: SuggestedManagerClassification;

  @Field(() => SuggestedManagerDepartment)
  department: SuggestedManagerDepartment;
}

@Resolver()
export class PositionRequestApiResolver {
  constructor(
    private readonly configService: ConfigService<AppConfigDto, true>,
    private positionRequestService: PositionRequestApiService,
  ) {}

  @Mutation(() => Int)
  async createPositionRequest(
    @GqlCurrentUser() { id: userId }: Express.User,
    @Args({ name: 'data', type: () => PositionRequestCreateInputWithoutUser })
    data: PositionRequestCreateInputWithoutUser,
  ) {
    data.user = { connect: { id: userId } };

    const newPositionRequest = await this.positionRequestService.createPositionRequest(data);
    return newPositionRequest.id;
  }

  @Mutation(() => PositionRequest)
  async submitPositionRequest(
    @Args('id', { type: () => Int }) id: number,
    @GqlCurrentUser() user: Express.User,
    @Args('comment', { nullable: true }) comment?: string,
    @Args('orgchart_png', { nullable: true }) orgchart_png?: string,
  ) {
    await this.positionRequestService.submitPositionRequest(id, comment, user.id, orgchart_png);

    // this ensures that returned object is the same as the one returned by getPositionRequest
    return this.positionRequestService.getPositionRequest(id, user.id, user.roles);
  }

  @Mutation(() => PositionRequest)
  async updatePositionRequest(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateInput') updateInput: PositionRequestUpdateInput,
    @Args('returnFullObject', { type: () => Boolean, defaultValue: false }) returnFullObject: boolean,
    @GqlCurrentUser() user: Express.User,
  ) {
    const updatedPositionRequest = await this.positionRequestService.updatePositionRequest(id, updateInput, user.id);

    if (returnFullObject) {
      return this.positionRequestService.getPositionRequest(id, user.id, user.roles);
    }

    return updatedPositionRequest;
  }

  @Query(() => PositionRequestStatusCounts, { name: 'positionRequestsCount' })
  async positionRequestsCount(
    @GqlCurrentUser() user: Express.User,
    @Args() args?: ExtendedFindManyPositionRequestWithSearch,
    @Args('requestingFeature', { type: () => RequestingFeature, nullable: true }) requestingFeature?: RequestingFeature,
  ) {
    return await this.positionRequestService.getPositionRequestCount(args, user.id, user.roles, requestingFeature);
  }

  @Roles('classification', 'hiring-manager', 'total-compensation')
  @Query(() => [PositionRequest], { name: 'positionRequests' })
  async getPositionRequests(
    @GqlCurrentUser() user: Express.User,
    @Args() args?: ExtendedFindManyPositionRequestWithSearch,
    @Args('requestingFeature', { type: () => RequestingFeature, nullable: true }) requestingFeature?: RequestingFeature,
  ) {
    return this.positionRequestService.getPositionRequests(args, user.id, user.roles, requestingFeature);
  }

  @Query(() => PositionRequest, { name: 'positionRequest' })
  async getPositionRequest(@GqlCurrentUser() user: Express.User, @Args('id') id: number) {
    return this.positionRequestService.getPositionRequest(+id, user.id, user.roles);
  }

  @Query(() => PositionRequest, { name: 'sharedPositionRequest', nullable: true })
  async getSharedPositionRequest(@Args('uuid') uuid: string) {
    return this.positionRequestService.getSharedPositionRequest(uuid);
  }

  @Query(() => PositionNeedsReviewResult, { name: 'positionNeedsRivew' })
  async positionNeedsReview(@GqlCurrentUser() user: Express.User, @Args('id') id: number) {
    const position = await this.positionRequestService.getPositionRequest(+id, user.id, user.roles);
    if (!position) {
      return false;
    }
    return this.positionRequestService.positionRequestNeedsReview(+id);
  }

  @Query(() => [PositionRequestUserClassification], { name: 'positionRequestUserClassifications' })
  async getPositionRequestUserClassifications(@GqlCurrentUser() { id: userId }: Express.User) {
    return this.positionRequestService.getPositionRequestUserClassifications(userId);
  }

  @Mutation(() => PositionRequestResponse, { name: 'deletePositionRequest' })
  async deletePositionRequest(
    @Args('id', { type: () => Int }) id: number,
    @GqlCurrentUser() { id: userId }: Express.User,
  ) {
    return this.positionRequestService.deletePositionRequest(id, userId);
  }

  @Roles('total-compensation', 'classification')
  @Query(() => [PositionRequestUserClassification], { name: 'positionRequestClassifications' })
  async getPositionRequestClassifications() {
    return this.positionRequestService.getPositionRequestClassifications();
  }

  @Roles('total-compensation', 'classification')
  @Query(() => [Int], { name: 'positionRequestJobStoreNumbers' })
  async getPositionRequestJobStoreNumbers() {
    return this.positionRequestService.getPositionRequestJobStoreNumbers();
  }

  @Roles('total-compensation', 'classification')
  @Query(() => [String], { name: 'positionRequestStatuses' })
  async getPositionRequestStatuses() {
    return this.positionRequestService.getPositionRequestStatuses();
  }

  @Roles('total-compensation', 'classification')
  @Query(() => [UserBasicInfo], { name: 'positionRequestSubmittedBy' })
  async getpositionRequestSubmittedBy(
    @GqlCurrentUser() user: Express.User,
    @Args('requestingFeature', { type: () => RequestingFeature, nullable: true }) requestingFeature?: RequestingFeature,
  ) {
    return this.positionRequestService.getPositionRequestSubmittedBy(user.roles, requestingFeature);
  }

  @Mutation(() => Boolean)
  //deprecated - if we want to use this in the future, update to check Peoplesoft status as well
  async updatePositionRequestStatus(
    @Args('id', { type: () => Int }) id: number,
    @Args('status', { type: () => Int }) status: number,
    @GqlCurrentUser() user: Express.User,
  ) {
    // This is only for e2e testing to simulate classifications changing status of sercie request
    // check for test node env flag, if not true, return false
    if (this.configService.get('TEST_ENV') !== 'true') {
      return false;
    }

    // get CRM service id from position request id from db

    const positionRequest = await this.positionRequestService.getPositionRequest(id, user.id, ['classification']);

    const crmId = positionRequest.crm_id;

    await this.positionRequestService.updatePositionRequestStatus(crmId, status);
    return true;
  }

  @Query(() => [SuggestedManager], { name: 'suggestedManagers' })
  async suggestedManagers(
    @Args('positionNumber') positionNumber: string,
    @Args('positionRequestId') positionRequestId: number, // Fixed parameter name
    @GqlCurrentUser() user: Express.User,
  ) {
    return await this.positionRequestService.getSuggestedManagers(positionNumber, positionRequestId);
  }
}
