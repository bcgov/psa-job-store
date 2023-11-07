import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyUpdateManyWithoutMinistryNestedInput } from '../behavioural-competency/behavioural-competency-update-many-without-ministry-nested.input';

@InputType()
export class MinistryUpdateWithoutJob_profilesInput {
  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => BehaviouralCompetencyUpdateManyWithoutMinistryNestedInput, { nullable: true })
  BehaviouralCompetency?: BehaviouralCompetencyUpdateManyWithoutMinistryNestedInput;
}
