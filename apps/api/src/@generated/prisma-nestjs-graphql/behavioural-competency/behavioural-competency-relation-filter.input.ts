import { Field, InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyWhereInput } from './behavioural-competency-where.input';

@InputType()
export class BehaviouralCompetencyRelationFilter {
  @Field(() => BehaviouralCompetencyWhereInput, { nullable: true })
  is?: BehaviouralCompetencyWhereInput;

  @Field(() => BehaviouralCompetencyWhereInput, { nullable: true })
  isNot?: BehaviouralCompetencyWhereInput;
}
