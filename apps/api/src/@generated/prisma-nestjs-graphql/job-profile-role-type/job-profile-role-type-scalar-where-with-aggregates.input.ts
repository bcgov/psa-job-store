import { Field, InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class JobProfileRoleTypeScalarWhereWithAggregatesInput {
  @Field(() => [JobProfileRoleTypeScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<JobProfileRoleTypeScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileRoleTypeScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<JobProfileRoleTypeScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileRoleTypeScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<JobProfileRoleTypeScalarWhereWithAggregatesInput>;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter;
}
