import { Field, InputType, Int } from '@nestjs/graphql';
import { JobProfileListRelationFilter } from '../job-profile/job-profile-list-relation-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { JobProfileRoleWhereInput } from './job-profile-role-where.input';

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
