import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { EnumJobProfileRoleTypeFilter } from '../prisma/enum-job-profile-role-type-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { JobProfileListRelationFilter } from '../job-profile/job-profile-list-relation-filter.input';

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

  @Field(() => EnumJobProfileRoleTypeFilter, { nullable: true })
  type?: EnumJobProfileRoleTypeFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => JobProfileListRelationFilter, { nullable: true })
  job_profiles?: JobProfileListRelationFilter;
}
