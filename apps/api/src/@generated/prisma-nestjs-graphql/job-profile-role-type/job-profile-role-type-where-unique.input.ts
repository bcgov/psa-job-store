import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileRoleTypeWhereInput } from './job-profile-role-type-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { JobProfileListRelationFilter } from '../job-profile/job-profile-list-relation-filter.input';

@InputType()
export class JobProfileRoleTypeWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => [JobProfileRoleTypeWhereInput], { nullable: true })
  AND?: Array<JobProfileRoleTypeWhereInput>;

  @Field(() => [JobProfileRoleTypeWhereInput], { nullable: true })
  OR?: Array<JobProfileRoleTypeWhereInput>;

  @Field(() => [JobProfileRoleTypeWhereInput], { nullable: true })
  NOT?: Array<JobProfileRoleTypeWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => JobProfileListRelationFilter, { nullable: true })
  job_profiles?: JobProfileListRelationFilter;
}
