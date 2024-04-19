import { Field, InputType } from '@nestjs/graphql';
import { EnumPositionRequestStatusFilter } from './enum-position-request-status-filter.input';
import { IntFilter } from './int-filter.input';
import { PositionRequestStatus } from './position-request-status.enum';

@InputType()
export class EnumPositionRequestStatusWithAggregatesFilter {
  @Field(() => PositionRequestStatus, { nullable: true })
  equals?: keyof typeof PositionRequestStatus;

  @Field(() => [PositionRequestStatus], { nullable: true })
  in?: Array<keyof typeof PositionRequestStatus>;

  @Field(() => [PositionRequestStatus], { nullable: true })
  notIn?: Array<keyof typeof PositionRequestStatus>;

  @Field(() => EnumPositionRequestStatusWithAggregatesFilter, { nullable: true })
  not?: EnumPositionRequestStatusWithAggregatesFilter;

  @Field(() => IntFilter, { nullable: true })
  _count?: IntFilter;

  @Field(() => EnumPositionRequestStatusFilter, { nullable: true })
  _min?: EnumPositionRequestStatusFilter;

  @Field(() => EnumPositionRequestStatusFilter, { nullable: true })
  _max?: EnumPositionRequestStatusFilter;
}
