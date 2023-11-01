import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { BehaviouralCompetencyUncheckedCreateNestedManyWithoutMinistryInput } from '../behavioural-competency/behavioural-competency-unchecked-create-nested-many-without-ministry.input';

@InputType()
export class MinistryUncheckedCreateWithoutJob_profilesInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => BehaviouralCompetencyUncheckedCreateNestedManyWithoutMinistryInput, { nullable: true })
  BehaviouralCompetency?: BehaviouralCompetencyUncheckedCreateNestedManyWithoutMinistryInput;
}
