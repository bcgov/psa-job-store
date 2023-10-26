import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class JobCategoryScalarWhereWithAggregatesInput {
  @Field(() => [JobCategoryScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<JobCategoryScalarWhereWithAggregatesInput>;

  @Field(() => [JobCategoryScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<JobCategoryScalarWhereWithAggregatesInput>;

  @Field(() => [JobCategoryScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<JobCategoryScalarWhereWithAggregatesInput>;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter;
}
