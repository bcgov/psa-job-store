import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileReportsToClassification_idJob_profile_idCompoundUniqueInput } from './job-profile-reports-to-classification-id-job-profile-id-compound-unique.input';
import { JobProfileReportsToWhereInput } from './job-profile-reports-to-where.input';
import { IntFilter } from '../prisma/int-filter.input';
import { ClassificationRelationFilter } from '../classification/classification-relation-filter.input';
import { JobProfileRelationFilter } from '../job-profile/job-profile-relation-filter.input';

@InputType()
export class JobProfileReportsToWhereUniqueInput {
  @Field(() => JobProfileReportsToClassification_idJob_profile_idCompoundUniqueInput, { nullable: true })
  classification_id_job_profile_id?: JobProfileReportsToClassification_idJob_profile_idCompoundUniqueInput;

  @Field(() => [JobProfileReportsToWhereInput], { nullable: true })
  AND?: Array<JobProfileReportsToWhereInput>;

  @Field(() => [JobProfileReportsToWhereInput], { nullable: true })
  OR?: Array<JobProfileReportsToWhereInput>;

  @Field(() => [JobProfileReportsToWhereInput], { nullable: true })
  NOT?: Array<JobProfileReportsToWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  classification_id?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  job_profile_id?: IntFilter;

  @Field(() => ClassificationRelationFilter, { nullable: true })
  classification?: ClassificationRelationFilter;

  @Field(() => JobProfileRelationFilter, { nullable: true })
  job_profile?: JobProfileRelationFilter;
}
