import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { JobProfileJobFamilyLinkListRelationFilter } from '../job-profile-job-family-link/job-profile-job-family-link-list-relation-filter.input';
import { JobProfileStreamListRelationFilter } from '../job-profile-stream/job-profile-stream-list-relation-filter.input';

@InputType()
export class JobProfileJobFamilyWhereInput {
  @Field(() => [JobProfileJobFamilyWhereInput], { nullable: true })
  AND?: Array<JobProfileJobFamilyWhereInput>;

  @Field(() => [JobProfileJobFamilyWhereInput], { nullable: true })
  OR?: Array<JobProfileJobFamilyWhereInput>;

  @Field(() => [JobProfileJobFamilyWhereInput], { nullable: true })
  NOT?: Array<JobProfileJobFamilyWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => JobProfileJobFamilyLinkListRelationFilter, { nullable: true })
  jobProfiles?: JobProfileJobFamilyLinkListRelationFilter;

  @Field(() => JobProfileStreamListRelationFilter, { nullable: true })
  JobProfileStream?: JobProfileStreamListRelationFilter;
}
