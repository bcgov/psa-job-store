import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyScalarWhereInput } from './behavioural-competency-scalar-where.input';
import { Type } from 'class-transformer';
import { BehaviouralCompetencyUpdateManyMutationInput } from './behavioural-competency-update-many-mutation.input';

@InputType()
export class BehaviouralCompetencyUpdateManyWithWhereWithoutMinistryInput {
  @Field(() => BehaviouralCompetencyScalarWhereInput, { nullable: false })
  @Type(() => BehaviouralCompetencyScalarWhereInput)
  where!: BehaviouralCompetencyScalarWhereInput;

  @Field(() => BehaviouralCompetencyUpdateManyMutationInput, { nullable: false })
  @Type(() => BehaviouralCompetencyUpdateManyMutationInput)
  data!: BehaviouralCompetencyUpdateManyMutationInput;
}
