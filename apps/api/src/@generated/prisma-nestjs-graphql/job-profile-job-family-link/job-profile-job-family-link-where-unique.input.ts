import { Field, InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyRelationFilter } from '../job-profile-job-family/job-profile-job-family-relation-filter.input';
import { JobProfileRelationFilter } from '../job-profile/job-profile-relation-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { JobProfileJobFamilyLinkJobProfileIdJobFamilyIdCompoundUniqueInput } from './job-profile-job-family-link-job-profile-id-job-family-id-compound-unique.input';
import { JobProfileJobFamilyLinkWhereInput } from './job-profile-job-family-link-where.input';

@InputType()
export class JobProfileJobFamilyLinkWhereUniqueInput {
  @Field(() => JobProfileJobFamilyLinkJobProfileIdJobFamilyIdCompoundUniqueInput, { nullable: true })
  jobProfileId_jobFamilyId?: JobProfileJobFamilyLinkJobProfileIdJobFamilyIdCompoundUniqueInput;

  @Field(() => [JobProfileJobFamilyLinkWhereInput], { nullable: true })
  AND?: Array<JobProfileJobFamilyLinkWhereInput>;

  @Field(() => [JobProfileJobFamilyLinkWhereInput], { nullable: true })
  OR?: Array<JobProfileJobFamilyLinkWhereInput>;

  @Field(() => [JobProfileJobFamilyLinkWhereInput], { nullable: true })
  NOT?: Array<JobProfileJobFamilyLinkWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  jobProfileId?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  jobFamilyId?: IntFilter;

  @Field(() => JobProfileRelationFilter, { nullable: true })
  jobProfile?: JobProfileRelationFilter;

  @Field(() => JobProfileJobFamilyRelationFilter, { nullable: true })
  jobFamily?: JobProfileJobFamilyRelationFilter;
}
