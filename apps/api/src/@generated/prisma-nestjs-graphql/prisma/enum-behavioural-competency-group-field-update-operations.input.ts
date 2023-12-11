import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyGroup } from './behavioural-competency-group.enum';

@InputType()
export class EnumBehaviouralCompetencyGroupFieldUpdateOperationsInput {
  @Field(() => BehaviouralCompetencyGroup, { nullable: true })
  set?: keyof typeof BehaviouralCompetencyGroup;
}
