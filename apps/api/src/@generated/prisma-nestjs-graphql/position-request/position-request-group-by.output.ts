import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { PositionRequestStatus } from '../prisma/position-request-status.enum';
import { PositionRequestCountAggregate } from './position-request-count-aggregate.output';
import { PositionRequestAvgAggregate } from './position-request-avg-aggregate.output';
import { PositionRequestSumAggregate } from './position-request-sum-aggregate.output';
import { PositionRequestMinAggregate } from './position-request-min-aggregate.output';
import { PositionRequestMaxAggregate } from './position-request-max-aggregate.output';

@ObjectType()
export class PositionRequestGroupBy {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  step!: number;

  @Field(() => String, { nullable: false })
  reports_to_position_id!: string;

  @Field(() => String, { nullable: false })
  department_id!: string;

  @Field(() => Int, { nullable: true })
  parent_job_profile_id?: number;

  @Field(() => GraphQLJSON, { nullable: true })
  profile_json?: any;

  @Field(() => GraphQLJSON, { nullable: true })
  orgchart_json?: any;

  @Field(() => String, { nullable: true })
  user_id?: string;

  @Field(() => String, { nullable: true })
  classificationAssignedTo?: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  position_number?: number;

  @Field(() => String, { nullable: true })
  classification_id?: string;

  @Field(() => String, { nullable: true })
  classification_code?: string;

  @Field(() => String, { nullable: true })
  user_name?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  submission_id?: string;

  @Field(() => Date, { nullable: true })
  submitted_at?: Date | string;

  @Field(() => Date, { nullable: true })
  approved_at?: Date | string;

  @Field(() => PositionRequestStatus, { nullable: true })
  status?: keyof typeof PositionRequestStatus;

  @Field(() => Date, { nullable: false })
  updated_at!: Date | string;

  @Field(() => PositionRequestCountAggregate, { nullable: true })
  _count?: PositionRequestCountAggregate;

  @Field(() => PositionRequestAvgAggregate, { nullable: true })
  _avg?: PositionRequestAvgAggregate;

  @Field(() => PositionRequestSumAggregate, { nullable: true })
  _sum?: PositionRequestSumAggregate;

  @Field(() => PositionRequestMinAggregate, { nullable: true })
  _min?: PositionRequestMinAggregate;

  @Field(() => PositionRequestMaxAggregate, { nullable: true })
  _max?: PositionRequestMaxAggregate;
}
