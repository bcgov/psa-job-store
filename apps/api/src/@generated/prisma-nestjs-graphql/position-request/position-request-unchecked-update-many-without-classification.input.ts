import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { PositionRequestStatus } from '../prisma/position-request-status.enum';

@InputType()
export class PositionRequestUncheckedUpdateManyWithoutClassificationInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  step?: number;

  @Field(() => Int, { nullable: true })
  reports_to_position_id?: number;

  @Field(() => Int, { nullable: true })
  parent_job_profile_id?: number;

  @Field(() => GraphQLJSON, { nullable: true })
  profile_json?: any;

  @Field(() => String, { nullable: true })
  user_id?: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  position_number?: number;

  @Field(() => String, { nullable: true })
  submission_id?: string;

  @Field(() => PositionRequestStatus, { nullable: true })
  status?: keyof typeof PositionRequestStatus;
}
