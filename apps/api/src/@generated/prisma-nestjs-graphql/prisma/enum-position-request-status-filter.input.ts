import { Field, InputType } from '@nestjs/graphql';
import { PositionRequestStatus } from './position-request-status.enum';

@InputType()
export class EnumPositionRequestStatusFilter {
  @Field(() => PositionRequestStatus, { nullable: true })
  equals?: keyof typeof PositionRequestStatus;

  @Field(() => [PositionRequestStatus], { nullable: true })
  in?: Array<keyof typeof PositionRequestStatus>;

  @Field(() => [PositionRequestStatus], { nullable: true })
  notIn?: Array<keyof typeof PositionRequestStatus>;

  @Field(() => EnumPositionRequestStatusFilter, { nullable: true })
  not?: EnumPositionRequestStatusFilter;
}
