import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileClassificationClassification_idJob_profile_idCompoundUniqueInput } from './job-profile-classification-classification-id-job-profile-id-compound-unique.input';
import { JobProfileClassificationWhereInput } from './job-profile-classification-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { ClassificationRelationFilter } from '../classification/classification-relation-filter.input';
import { JobProfileRelationFilter } from '../job-profile/job-profile-relation-filter.input';

@InputType()
export class JobProfileClassificationWhereUniqueInput {
  @Field(() => JobProfileClassificationClassification_idJob_profile_idCompoundUniqueInput, { nullable: true })
  classification_id_job_profile_id?: JobProfileClassificationClassification_idJob_profile_idCompoundUniqueInput;

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
