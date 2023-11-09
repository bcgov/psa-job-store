import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { IntListFilter } from '../prisma/int-list-filter.input';

@InputType()
export class GridScalarWhereWithAggregatesInput {
  @Field(() => [GridScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<GridScalarWhereWithAggregatesInput>;

  @Field(() => [GridScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<GridScalarWhereWithAggregatesInput>;

  @Field(() => [GridScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<GridScalarWhereWithAggregatesInput>;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter;

  @Field(() => IntListFilter, { nullable: true })
  steps?: IntListFilter;
}
