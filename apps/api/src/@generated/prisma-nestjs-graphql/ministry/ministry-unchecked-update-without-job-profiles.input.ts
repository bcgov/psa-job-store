import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { BehaviouralCompetencyUncheckedUpdateManyWithoutMinistryNestedInput } from '../behavioural-competency/behavioural-competency-unchecked-update-many-without-ministry-nested.input';

@InputType()
export class MinistryUncheckedUpdateWithoutJob_profilesInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => BehaviouralCompetencyUncheckedUpdateManyWithoutMinistryNestedInput, { nullable: true })
  BehaviouralCompetency?: BehaviouralCompetencyUncheckedUpdateManyWithoutMinistryNestedInput;
}
