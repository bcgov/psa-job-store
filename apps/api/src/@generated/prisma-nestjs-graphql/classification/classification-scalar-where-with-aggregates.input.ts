import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';

@InputType()
export class ClassificationScalarWhereWithAggregatesInput {
  @Field(() => [ClassificationScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<ClassificationScalarWhereWithAggregatesInput>;

  @Field(() => [ClassificationScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<ClassificationScalarWhereWithAggregatesInput>;

  @Field(() => [ClassificationScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<ClassificationScalarWhereWithAggregatesInput>;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  grid_id?: IntWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  occupation_group_id?: IntWithAggregatesFilter;
}
