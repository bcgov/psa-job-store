import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class MinistryScalarWhereWithAggregatesInput {
  @Field(() => [MinistryScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<MinistryScalarWhereWithAggregatesInput>;

  @Field(() => [MinistryScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<MinistryScalarWhereWithAggregatesInput>;

  @Field(() => [MinistryScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<MinistryScalarWhereWithAggregatesInput>;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  code?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter;
}
