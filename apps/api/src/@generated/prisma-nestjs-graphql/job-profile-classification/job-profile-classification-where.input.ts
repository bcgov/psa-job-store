import { Field, InputType } from '@nestjs/graphql';
import { ClassificationRelationFilter } from '../classification/classification-relation-filter.input';
import { JobProfileRelationFilter } from '../job-profile/job-profile-relation-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class JobProfileClassificationWhereInput {
  @Field(() => [JobProfileClassificationWhereInput], { nullable: true })
  AND?: Array<JobProfileClassificationWhereInput>;

  @Field(() => [JobProfileClassificationWhereInput], { nullable: true })
  OR?: Array<JobProfileClassificationWhereInput>;

  @Field(() => [JobProfileClassificationWhereInput], { nullable: true })
  NOT?: Array<JobProfileClassificationWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  classification_id?: StringFilter;

  @Field(() => IntFilter, { nullable: true })
  job_profile_id?: IntFilter;

  @Field(() => ClassificationRelationFilter, { nullable: true })
  classification?: ClassificationRelationFilter;

  @Field(() => JobProfileRelationFilter, { nullable: true })
  job_profile?: JobProfileRelationFilter;
}
