import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyCreateNestedManyWithoutMinistryInput } from '../behavioural-competency/behavioural-competency-create-nested-many-without-ministry.input';

@InputType()
export class MinistryCreateWithoutJob_profilesInput {
  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => BehaviouralCompetencyCreateNestedManyWithoutMinistryInput, { nullable: true })
  BehaviouralCompetency?: BehaviouralCompetencyCreateNestedManyWithoutMinistryInput;
}
