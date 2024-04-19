import { Field, InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyCategory } from './behavioural-competency-category.enum';
import { EnumBehaviouralCompetencyCategoryFilter } from './enum-behavioural-competency-category-filter.input';
import { IntFilter } from './int-filter.input';

@InputType()
export class EnumBehaviouralCompetencyCategoryWithAggregatesFilter {
  @Field(() => BehaviouralCompetencyCategory, { nullable: true })
  equals?: keyof typeof BehaviouralCompetencyCategory;

  @Field(() => [BehaviouralCompetencyCategory], { nullable: true })
  in?: Array<keyof typeof BehaviouralCompetencyCategory>;

  @Field(() => [BehaviouralCompetencyCategory], { nullable: true })
  notIn?: Array<keyof typeof BehaviouralCompetencyCategory>;

  @Field(() => EnumBehaviouralCompetencyCategoryWithAggregatesFilter, { nullable: true })
  not?: EnumBehaviouralCompetencyCategoryWithAggregatesFilter;

  @Field(() => IntFilter, { nullable: true })
  _count?: IntFilter;

  @Field(() => EnumBehaviouralCompetencyCategoryFilter, { nullable: true })
  _min?: EnumBehaviouralCompetencyCategoryFilter;

  @Field(() => EnumBehaviouralCompetencyCategoryFilter, { nullable: true })
  _max?: EnumBehaviouralCompetencyCategoryFilter;
}
