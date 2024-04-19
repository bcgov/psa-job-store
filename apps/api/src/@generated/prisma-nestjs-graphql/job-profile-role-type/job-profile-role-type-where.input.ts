import { Field, InputType } from '@nestjs/graphql';
import { JobProfileListRelationFilter } from '../job-profile/job-profile-list-relation-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class JobProfileRoleTypeWhereInput {
  @Field(() => [JobProfileRoleTypeWhereInput], { nullable: true })
  AND?: Array<JobProfileRoleTypeWhereInput>;

  @Field(() => [JobProfileRoleTypeWhereInput], { nullable: true })
  OR?: Array<JobProfileRoleTypeWhereInput>;

  @Field(() => [JobProfileRoleTypeWhereInput], { nullable: true })
  NOT?: Array<JobProfileRoleTypeWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => JobProfileListRelationFilter, { nullable: true })
  job_profiles?: JobProfileListRelationFilter;
}
