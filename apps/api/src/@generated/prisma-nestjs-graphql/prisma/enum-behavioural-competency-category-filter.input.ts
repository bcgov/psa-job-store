import { Field, InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyCategory } from './behavioural-competency-category.enum';

@InputType()
export class EnumBehaviouralCompetencyCategoryFilter {
  @Field(() => BehaviouralCompetencyCategory, { nullable: true })
  equals?: keyof typeof BehaviouralCompetencyCategory;

  @Field(() => [BehaviouralCompetencyCategory], { nullable: true })
  in?: Array<keyof typeof BehaviouralCompetencyCategory>;

  @Field(() => [BehaviouralCompetencyCategory], { nullable: true })
  notIn?: Array<keyof typeof BehaviouralCompetencyCategory>;

  @Field(() => EnumBehaviouralCompetencyCategoryFilter, { nullable: true })
  not?: EnumBehaviouralCompetencyCategoryFilter;
}
