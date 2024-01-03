import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { PositionRequestStatus } from '../prisma/position-request-status.enum';
import { JobProfile } from '../job-profile/job-profile.model';

@ObjectType()
export class PositionRequest {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  step!: number;

  @Field(() => String, { nullable: false })
  reports_to_position_id!: string;

  @Field(() => Int, { nullable: true })
  parent_job_profile_id!: number | null;

  @Field(() => GraphQLJSON, { nullable: true })
  profile_json!: any | null;

  @Field(() => String, { nullable: true })
  user_id!: string | null;

  @Field(() => String, { nullable: true })
  title!: string | null;

  @Field(() => Int, { nullable: true })
  position_number!: number | null;

  @Field(() => String, { nullable: true })
  classification_id!: string | null;

  @Field(() => String, { nullable: true })
  classification_code!: string | null;

  @Field(() => String, { nullable: true })
  submission_id!: string | null;

  @Field(() => PositionRequestStatus, { nullable: true })
  status!: keyof typeof PositionRequestStatus | null;

  @Field(() => Date, { nullable: false })
  updated_at!: Date;

  @Field(() => JobProfile, { nullable: true })
  parent_job_profile?: JobProfile | null;
}
