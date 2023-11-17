import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { ClassificationRelationFilter } from '../classification/classification-relation-filter.input';
import { JobProfileRelationFilter } from '../job-profile/job-profile-relation-filter.input';

@InputType()
export class JobProfileReportsToWhereInput {
  @Field(() => [JobProfileReportsToWhereInput], { nullable: true })
  AND?: Array<JobProfileReportsToWhereInput>;

  @Field(() => [JobProfileReportsToWhereInput], { nullable: true })
  OR?: Array<JobProfileReportsToWhereInput>;

  @Field(() => [JobProfileReportsToWhereInput], { nullable: true })
  NOT?: Array<JobProfileReportsToWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  classification_id?: StringFilter;

  @Field(() => IntFilter, { nullable: true })
  job_profile_id?: IntFilter;

  @Field(() => ClassificationRelationFilter, { nullable: true })
  classification?: ClassificationRelationFilter;

  @Field(() => JobProfileRelationFilter, { nullable: true })
  job_profile?: JobProfileRelationFilter;
}
