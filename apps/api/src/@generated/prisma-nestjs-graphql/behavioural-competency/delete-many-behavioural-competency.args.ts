import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { BehaviouralCompetencyWhereInput } from './behavioural-competency-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyBehaviouralCompetencyArgs {
  @Field(() => BehaviouralCompetencyWhereInput, { nullable: true })
  @Type(() => BehaviouralCompetencyWhereInput)
  where?: BehaviouralCompetencyWhereInput;
}
