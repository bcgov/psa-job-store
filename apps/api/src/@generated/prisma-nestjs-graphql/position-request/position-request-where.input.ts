import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { JsonFilter } from '../prisma/json-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { EnumPositionRequestStatusFilter } from '../prisma/enum-position-request-status-filter.input';
import { ClassificationRelationFilter } from '../classification/classification-relation-filter.input';
import { JobProfileRelationFilter } from '../job-profile/job-profile-relation-filter.input';

@InputType()
export class PositionRequestWhereInput {
  @Field(() => [PositionRequestWhereInput], { nullable: true })
  AND?: Array<PositionRequestWhereInput>;

  @Field(() => [PositionRequestWhereInput], { nullable: true })
  OR?: Array<PositionRequestWhereInput>;

  @Field(() => [PositionRequestWhereInput], { nullable: true })
  NOT?: Array<PositionRequestWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  step?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  reports_to_position_id?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  parent_job_profile_id?: IntFilter;

  @Field(() => JsonFilter, { nullable: true })
  profile_json?: JsonFilter;

  @Field(() => UuidFilter, { nullable: true })
  user_id?: UuidFilter;

  @Field(() => StringFilter, { nullable: true })
  title?: StringFilter;

  @Field(() => IntFilter, { nullable: true })
  position_number?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  classification_id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  submission_id?: StringFilter;

  @Field(() => EnumPositionRequestStatusFilter, { nullable: true })
  status?: EnumPositionRequestStatusFilter;

  @Field(() => ClassificationRelationFilter, { nullable: true })
  classification?: ClassificationRelationFilter;

  @Field(() => JobProfileRelationFilter, { nullable: true })
  parent_job_profile?: JobProfileRelationFilter;
}
