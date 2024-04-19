import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { BehaviouralCompetencyCreateInput } from './behavioural-competency-create.input';

@ArgsType()
export class CreateOneBehaviouralCompetencyArgs {
  @Field(() => BehaviouralCompetencyCreateInput, { nullable: false })
  @Type(() => BehaviouralCompetencyCreateInput)
  data!: BehaviouralCompetencyCreateInput;
}
