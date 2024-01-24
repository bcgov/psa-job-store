import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { JobProfileJobFamilyRelationFilter } from '../job-profile-job-family/job-profile-job-family-relation-filter.input';
import { JobProfileStreamLinkListRelationFilter } from '../job-profile-stream-link/job-profile-stream-link-list-relation-filter.input';

@InputType()
export class JobProfileStreamWhereInput {
  @Field(() => [JobProfileStreamWhereInput], { nullable: true })
  AND?: Array<JobProfileStreamWhereInput>;

  @Field(() => [JobProfileStreamWhereInput], { nullable: true })
  OR?: Array<JobProfileStreamWhereInput>;

  @Field(() => [JobProfileStreamWhereInput], { nullable: true })
  NOT?: Array<JobProfileStreamWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  job_family_id?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => JobProfileJobFamilyRelationFilter, { nullable: true })
  job_family?: JobProfileJobFamilyRelationFilter;

  @Field(() => JobProfileStreamLinkListRelationFilter, { nullable: true })
  jobProfiles?: JobProfileStreamLinkListRelationFilter;
}
