import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileRoleWhereInput } from './job-profile-role-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { JobProfileListRelationFilter } from '../job-profile/job-profile-list-relation-filter.input';

@InputType()
export class JobProfileRoleWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => [JobProfileRoleWhereInput], { nullable: true })
  AND?: Array<JobProfileRoleWhereInput>;

  @Field(() => [JobProfileRoleWhereInput], { nullable: true })
  OR?: Array<JobProfileRoleWhereInput>;

  @Field(() => [JobProfileRoleWhereInput], { nullable: true })
  NOT?: Array<JobProfileRoleWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => JobProfileListRelationFilter, { nullable: true })
  job_profiles?: JobProfileListRelationFilter;
}
