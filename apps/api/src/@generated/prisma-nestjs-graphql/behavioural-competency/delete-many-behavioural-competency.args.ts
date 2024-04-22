import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { BehaviouralCompetencyWhereInput } from './behavioural-competency-where.input';

@ArgsType()
export class DeleteManyBehaviouralCompetencyArgs {
  @Field(() => BehaviouralCompetencyWhereInput, { nullable: true })
  @Type(() => BehaviouralCompetencyWhereInput)
  where?: BehaviouralCompetencyWhereInput;
}
