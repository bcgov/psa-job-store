import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyWhereInput } from './behavioural-competency-where.input';

@InputType()
export class BehaviouralCompetencyListRelationFilter {
  @Field(() => BehaviouralCompetencyWhereInput, { nullable: true })
  every?: BehaviouralCompetencyWhereInput;

  @Field(() => BehaviouralCompetencyWhereInput, { nullable: true })
  some?: BehaviouralCompetencyWhereInput;

  @Field(() => BehaviouralCompetencyWhereInput, { nullable: true })
  none?: BehaviouralCompetencyWhereInput;
}
