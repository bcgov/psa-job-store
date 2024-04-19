import { Field, InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyType } from './behavioural-competency-type.enum';
import { EnumBehaviouralCompetencyTypeFilter } from './enum-behavioural-competency-type-filter.input';
import { IntFilter } from './int-filter.input';

@InputType()
export class EnumBehaviouralCompetencyTypeWithAggregatesFilter {
  @Field(() => BehaviouralCompetencyType, { nullable: true })
  equals?: keyof typeof BehaviouralCompetencyType;

  @Field(() => [BehaviouralCompetencyType], { nullable: true })
  in?: Array<keyof typeof BehaviouralCompetencyType>;

  @Field(() => [BehaviouralCompetencyType], { nullable: true })
  notIn?: Array<keyof typeof BehaviouralCompetencyType>;

  @Field(() => EnumBehaviouralCompetencyTypeWithAggregatesFilter, { nullable: true })
  not?: EnumBehaviouralCompetencyTypeWithAggregatesFilter;

  @Field(() => IntFilter, { nullable: true })
  _count?: IntFilter;

  @Field(() => EnumBehaviouralCompetencyTypeFilter, { nullable: true })
  _min?: EnumBehaviouralCompetencyTypeFilter;

  @Field(() => EnumBehaviouralCompetencyTypeFilter, { nullable: true })
  _max?: EnumBehaviouralCompetencyTypeFilter;
}
