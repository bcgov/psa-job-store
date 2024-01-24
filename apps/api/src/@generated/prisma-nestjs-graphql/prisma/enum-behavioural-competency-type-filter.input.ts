import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyType } from './behavioural-competency-type.enum';

@InputType()
export class EnumBehaviouralCompetencyTypeFilter {
  @Field(() => BehaviouralCompetencyType, { nullable: true })
  equals?: keyof typeof BehaviouralCompetencyType;

  @Field(() => [BehaviouralCompetencyType], { nullable: true })
  in?: Array<keyof typeof BehaviouralCompetencyType>;

  @Field(() => [BehaviouralCompetencyType], { nullable: true })
  notIn?: Array<keyof typeof BehaviouralCompetencyType>;

  @Field(() => EnumBehaviouralCompetencyTypeFilter, { nullable: true })
  not?: EnumBehaviouralCompetencyTypeFilter;
}
