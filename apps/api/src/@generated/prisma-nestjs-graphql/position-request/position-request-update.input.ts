import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { PositionRequestStatus } from '../prisma/position-request-status.enum';
import { ClassificationUpdateOneRequiredWithoutPositionRequestNestedInput } from '../classification/classification-update-one-required-without-position-request-nested.input';
import { JobProfileUpdateOneRequiredWithoutPosition_requestNestedInput } from '../job-profile/job-profile-update-one-required-without-position-request-nested.input';

@InputType()
export class PositionRequestUpdateInput {
  @Field(() => Int, { nullable: true })
  step?: number;

  @Field(() => Int, { nullable: true })
  reports_to_position_id?: number;

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

  @Field(() => ClassificationUpdateOneRequiredWithoutPositionRequestNestedInput, { nullable: true })
  classification?: ClassificationUpdateOneRequiredWithoutPositionRequestNestedInput;

  @Field(() => JobProfileUpdateOneRequiredWithoutPosition_requestNestedInput, { nullable: true })
  parent_job_profile?: JobProfileUpdateOneRequiredWithoutPosition_requestNestedInput;
}
