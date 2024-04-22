import { Field, InputType } from '@nestjs/graphql';
import { EnumBehaviouralCompetencyCategoryWithAggregatesFilter } from '../prisma/enum-behavioural-competency-category-with-aggregates-filter.input';
import { EnumBehaviouralCompetencyTypeWithAggregatesFilter } from '../prisma/enum-behavioural-competency-type-with-aggregates-filter.input';
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

  @Field(() => EnumBehaviouralCompetencyTypeWithAggregatesFilter, { nullable: true })
  type?: EnumBehaviouralCompetencyTypeWithAggregatesFilter;

  @Field(() => EnumBehaviouralCompetencyCategoryWithAggregatesFilter, { nullable: true })
  category?: EnumBehaviouralCompetencyCategoryWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  description?: StringWithAggregatesFilter;
}
