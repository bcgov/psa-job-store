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
  position_number!: number | null;

  @Field(() => String, { nullable: false })
  classification_id!: string;

  @Field(() => String, { nullable: true })
  classification_code!: string | null;

  @Field(() => String, { nullable: true })
  submission_id!: string | null;

  @Field(() => PositionRequestStatus, { nullable: true })
  status!: keyof typeof PositionRequestStatus | null;

  @Field(() => JobProfile, { nullable: false })
  parent_job_profile?: JobProfile;
}
