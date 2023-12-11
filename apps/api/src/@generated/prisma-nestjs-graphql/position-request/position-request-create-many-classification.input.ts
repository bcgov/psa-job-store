import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { PositionRequestStatus } from '../prisma/position-request-status.enum';

@InputType()
export class PositionRequestCreateManyClassificationInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: false })
  step!: number;

  @Field(() => Int, { nullable: false })
  reports_to_position_id!: number;

  @Field(() => Int, { nullable: false })
  parent_job_profile_id!: number;

  @Field(() => GraphQLJSON, { nullable: false })
  profile_json!: any;

  @Field(() => String, { nullable: false })
  user_id!: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => Int, { nullable: true })
  position_number?: number;

  @Field(() => String, { nullable: true })
  submission_id?: string;

  @Field(() => PositionRequestStatus, { nullable: true })
  status?: keyof typeof PositionRequestStatus;
}
