import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class OccupationGroupScalarWhereWithAggregatesInput {
  @Field(() => [OccupationGroupScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<OccupationGroupScalarWhereWithAggregatesInput>;

  @Field(() => [OccupationGroupScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<OccupationGroupScalarWhereWithAggregatesInput>;

  @Field(() => [OccupationGroupScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<OccupationGroupScalarWhereWithAggregatesInput>;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  code?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter;
}
