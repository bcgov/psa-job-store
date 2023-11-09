import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { EnumBehaviouralCompetencyMembershipWithAggregatesFilter } from '../prisma/enum-behavioural-competency-membership-with-aggregates-filter.input';
import { EnumBehaviouralCompetencyGroupWithAggregatesFilter } from '../prisma/enum-behavioural-competency-group-with-aggregates-filter.input';
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

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  ministry_id?: IntWithAggregatesFilter;

  @Field(() => EnumBehaviouralCompetencyMembershipWithAggregatesFilter, { nullable: true })
  membership?: EnumBehaviouralCompetencyMembershipWithAggregatesFilter;

  @Field(() => EnumBehaviouralCompetencyGroupWithAggregatesFilter, { nullable: true })
  group?: EnumBehaviouralCompetencyGroupWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  description?: StringWithAggregatesFilter;
}
