import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyGroup } from './behavioural-competency-group.enum';

@InputType()
export class EnumBehaviouralCompetencyGroupFilter {
  @Field(() => BehaviouralCompetencyGroup, { nullable: true })
  equals?: keyof typeof BehaviouralCompetencyGroup;

  @Field(() => [BehaviouralCompetencyGroup], { nullable: true })
  in?: Array<keyof typeof BehaviouralCompetencyGroup>;

  @Field(() => [BehaviouralCompetencyGroup], { nullable: true })
  notIn?: Array<keyof typeof BehaviouralCompetencyGroup>;

  @Field(() => EnumBehaviouralCompetencyGroupFilter, { nullable: true })
  not?: EnumBehaviouralCompetencyGroupFilter;
}
