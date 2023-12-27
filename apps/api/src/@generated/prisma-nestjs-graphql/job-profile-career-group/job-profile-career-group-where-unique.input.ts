import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileCareerGroupWhereInput } from './job-profile-career-group-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { JobProfileListRelationFilter } from '../job-profile/job-profile-list-relation-filter.input';

@InputType()
export class JobProfileCareerGroupWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => [JobProfileCareerGroupWhereInput], { nullable: true })
  AND?: Array<JobProfileCareerGroupWhereInput>;

  @Field(() => [JobProfileCareerGroupWhereInput], { nullable: true })
  OR?: Array<JobProfileCareerGroupWhereInput>;

  @Field(() => [JobProfileCareerGroupWhereInput], { nullable: true })
  NOT?: Array<JobProfileCareerGroupWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => JobProfileListRelationFilter, { nullable: true })
  job_profiles?: JobProfileListRelationFilter;
}
