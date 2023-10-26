import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class BehaviouralCompetencyScalarWhereWithAggregatesInput {
  @Field(() => [BehaviouralCompetencyScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<BehaviouralCompetencyScalarWhereWithAggregatesInput>;

  @Field(() => [BehaviouralCompetencyScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<BehaviouralCompetencyScalarWhereWithAggregatesInput>;

  @Field(() => [BehaviouralCompetencyScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<BehaviouralCompetencyScalarWhereWithAggregatesInput>;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  description?: StringWithAggregatesFilter;
}
