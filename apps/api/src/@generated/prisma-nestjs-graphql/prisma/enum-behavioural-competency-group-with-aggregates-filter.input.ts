import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyGroup } from './behavioural-competency-group.enum';
import { IntFilter } from './int-filter.input';
import { EnumBehaviouralCompetencyGroupFilter } from './enum-behavioural-competency-group-filter.input';

@InputType()
export class EnumBehaviouralCompetencyGroupWithAggregatesFilter {
  @Field(() => BehaviouralCompetencyGroup, { nullable: true })
  equals?: keyof typeof BehaviouralCompetencyGroup;

  @Field(() => [BehaviouralCompetencyGroup], { nullable: true })
  in?: Array<keyof typeof BehaviouralCompetencyGroup>;

  @Field(() => [BehaviouralCompetencyGroup], { nullable: true })
  notIn?: Array<keyof typeof BehaviouralCompetencyGroup>;

  @Field(() => EnumBehaviouralCompetencyGroupWithAggregatesFilter, { nullable: true })
  not?: EnumBehaviouralCompetencyGroupWithAggregatesFilter;

  @Field(() => IntFilter, { nullable: true })
  _count?: IntFilter;

  @Field(() => EnumBehaviouralCompetencyGroupFilter, { nullable: true })
  _min?: EnumBehaviouralCompetencyGroupFilter;

  @Field(() => EnumBehaviouralCompetencyGroupFilter, { nullable: true })
  _max?: EnumBehaviouralCompetencyGroupFilter;
}
