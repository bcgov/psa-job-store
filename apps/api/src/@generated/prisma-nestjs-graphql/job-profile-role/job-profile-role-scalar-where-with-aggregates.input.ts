import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { EnumJobProfileRoleTypeWithAggregatesFilter } from '../prisma/enum-job-profile-role-type-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class JobProfileRoleScalarWhereWithAggregatesInput {
  @Field(() => [JobProfileRoleScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<JobProfileRoleScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileRoleScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<JobProfileRoleScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileRoleScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<JobProfileRoleScalarWhereWithAggregatesInput>;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter;

  @Field(() => EnumJobProfileRoleTypeWithAggregatesFilter, { nullable: true })
  type?: EnumJobProfileRoleTypeWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter;
}
