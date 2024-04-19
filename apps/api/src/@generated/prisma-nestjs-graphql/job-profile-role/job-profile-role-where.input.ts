import { Field, InputType } from '@nestjs/graphql';
import { JobProfileListRelationFilter } from '../job-profile/job-profile-list-relation-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class JobProfileRoleWhereInput {
  @Field(() => [JobProfileRoleWhereInput], { nullable: true })
  AND?: Array<JobProfileRoleWhereInput>;

  @Field(() => [JobProfileRoleWhereInput], { nullable: true })
  OR?: Array<JobProfileRoleWhereInput>;

  @Field(() => [JobProfileRoleWhereInput], { nullable: true })
  NOT?: Array<JobProfileRoleWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => JobProfileListRelationFilter, { nullable: true })
  job_profiles?: JobProfileListRelationFilter;
}
