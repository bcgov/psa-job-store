import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class JobRoleScalarWhereWithAggregatesInput {
  @Field(() => [JobRoleScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<JobRoleScalarWhereWithAggregatesInput>;

  @Field(() => [JobRoleScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<JobRoleScalarWhereWithAggregatesInput>;

  @Field(() => [JobRoleScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<JobRoleScalarWhereWithAggregatesInput>;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter;
}
