import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class CareerGroupScalarWhereWithAggregatesInput {
  @Field(() => [CareerGroupScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<CareerGroupScalarWhereWithAggregatesInput>;

  @Field(() => [CareerGroupScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<CareerGroupScalarWhereWithAggregatesInput>;

  @Field(() => [CareerGroupScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<CareerGroupScalarWhereWithAggregatesInput>;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter;
}
