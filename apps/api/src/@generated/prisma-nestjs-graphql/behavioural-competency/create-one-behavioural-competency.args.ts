import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { BehaviouralCompetencyCreateInput } from './behavioural-competency-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneBehaviouralCompetencyArgs {
  @Field(() => BehaviouralCompetencyCreateInput, { nullable: false })
  @Type(() => BehaviouralCompetencyCreateInput)
  data!: BehaviouralCompetencyCreateInput;
}
