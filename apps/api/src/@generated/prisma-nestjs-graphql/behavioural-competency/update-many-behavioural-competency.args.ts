import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { BehaviouralCompetencyUpdateManyMutationInput } from './behavioural-competency-update-many-mutation.input';
import { Type } from 'class-transformer';
import { BehaviouralCompetencyWhereInput } from './behavioural-competency-where.input';

@ArgsType()
export class UpdateManyBehaviouralCompetencyArgs {
  @Field(() => BehaviouralCompetencyUpdateManyMutationInput, { nullable: false })
  @Type(() => BehaviouralCompetencyUpdateManyMutationInput)
  data!: BehaviouralCompetencyUpdateManyMutationInput;

  @Field(() => BehaviouralCompetencyWhereInput, { nullable: true })
  @Type(() => BehaviouralCompetencyWhereInput)
  where?: BehaviouralCompetencyWhereInput;
}
