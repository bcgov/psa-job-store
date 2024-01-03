import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { PositionRequestStatus } from '../prisma/position-request-status.enum';

@InputType()
export class PositionRequestCreateManyInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: false })
  step!: number;

  @Field(() => String, { nullable: false })
  reports_to_position_id!: string;

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
  classification_id?: string;

  @Field(() => String, { nullable: true })
  classification_code?: string;

  @Field(() => String, { nullable: true })
  submission_id?: string;

  @Field(() => PositionRequestStatus, { nullable: true })
  status?: keyof typeof PositionRequestStatus;

  @Field(() => Date, { nullable: true })
  updated_at?: Date | string;
}
