import { Field, InputType, Int } from '@nestjs/graphql';
import { JobProfileJobFamilyRelationFilter } from '../job-profile-job-family/job-profile-job-family-relation-filter.input';
import { JobProfileStreamLinkListRelationFilter } from '../job-profile-stream-link/job-profile-stream-link-list-relation-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { JobProfileStreamWhereInput } from './job-profile-stream-where.input';

@InputType()
export class JobProfileStreamWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => [JobProfileStreamWhereInput], { nullable: true })
  AND?: Array<JobProfileStreamWhereInput>;

  @Field(() => [JobProfileStreamWhereInput], { nullable: true })
  OR?: Array<JobProfileStreamWhereInput>;

  @Field(() => [JobProfileStreamWhereInput], { nullable: true })
  NOT?: Array<JobProfileStreamWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  job_family_id?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => JobProfileJobFamilyRelationFilter, { nullable: true })
  job_family?: JobProfileJobFamilyRelationFilter;

  @Field(() => JobProfileStreamLinkListRelationFilter, { nullable: true })
  jobProfiles?: JobProfileStreamLinkListRelationFilter;
}
