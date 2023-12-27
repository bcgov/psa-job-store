import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileJobFamilyWhereInput } from './job-profile-job-family-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { JobProfileListRelationFilter } from '../job-profile/job-profile-list-relation-filter.input';

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

  @Field(() => JobProfileListRelationFilter, { nullable: true })
  job_profiles?: JobProfileListRelationFilter;
}
