import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileJobFamilyWhereInput } from './job-profile-job-family-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { JobProfileJobFamilyLinkListRelationFilter } from '../job-profile-job-family-link/job-profile-job-family-link-list-relation-filter.input';
import { JobProfileStreamListRelationFilter } from '../job-profile-stream/job-profile-stream-list-relation-filter.input';

@InputType()
export class JobProfileJobFamilyWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => [JobProfileJobFamilyWhereInput], { nullable: true })
  AND?: Array<JobProfileJobFamilyWhereInput>;

  @Field(() => [JobProfileJobFamilyWhereInput], { nullable: true })
  OR?: Array<JobProfileJobFamilyWhereInput>;

  @Field(() => [JobProfileJobFamilyWhereInput], { nullable: true })
  NOT?: Array<JobProfileJobFamilyWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => JobProfileJobFamilyLinkListRelationFilter, { nullable: true })
  jobProfiles?: JobProfileJobFamilyLinkListRelationFilter;

  @Field(() => JobProfileStreamListRelationFilter, { nullable: true })
  JobProfileStream?: JobProfileStreamListRelationFilter;
}
