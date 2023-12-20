import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobRoleWhereInput } from './job-role-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { JobProfileListRelationFilter } from '../job-profile/job-profile-list-relation-filter.input';

@InputType()
export class JobRoleWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => [JobRoleWhereInput], { nullable: true })
  AND?: Array<JobRoleWhereInput>;

  @Field(() => [JobRoleWhereInput], { nullable: true })
  OR?: Array<JobRoleWhereInput>;

  @Field(() => [JobRoleWhereInput], { nullable: true })
  NOT?: Array<JobRoleWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => JobProfileListRelationFilter, { nullable: true })
  profiles?: JobProfileListRelationFilter;
}
