import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { JobProfileListRelationFilter } from '../job-profile/job-profile-list-relation-filter.input';

@InputType()
export class JobRoleWhereInput {
  @Field(() => [JobRoleWhereInput], { nullable: true })
  AND?: Array<JobRoleWhereInput>;

  @Field(() => [JobRoleWhereInput], { nullable: true })
  OR?: Array<JobRoleWhereInput>;

  @Field(() => [JobRoleWhereInput], { nullable: true })
  NOT?: Array<JobRoleWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => JobProfileListRelationFilter, { nullable: true })
  profiles?: JobProfileListRelationFilter;
}
