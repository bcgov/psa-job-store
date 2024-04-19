import { Field, InputType, Int } from '@nestjs/graphql';
import { JobProfileListRelationFilter } from '../job-profile/job-profile-list-relation-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { JobProfileRoleTypeWhereInput } from './job-profile-role-type-where.input';

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
