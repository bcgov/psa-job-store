import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileContextWhereInput } from './job-profile-context-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { JobProfileRelationFilter } from '../job-profile/job-profile-relation-filter.input';

@InputType()
export class JobProfileContextWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  job_profile_id?: number;

  @Field(() => [JobProfileContextWhereInput], { nullable: true })
  AND?: Array<JobProfileContextWhereInput>;

  @Field(() => [JobProfileContextWhereInput], { nullable: true })
  OR?: Array<JobProfileContextWhereInput>;

  @Field(() => [JobProfileContextWhereInput], { nullable: true })
  NOT?: Array<JobProfileContextWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  description?: StringFilter;

  @Field(() => JobProfileRelationFilter, { nullable: true })
  job_profile?: JobProfileRelationFilter;
}
