import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyCreateNestedOneWithoutJob_profilesInput } from '../behavioural-competency/behavioural-competency-create-nested-one-without-job-profiles.input';

@InputType()
export class JobProfileBehaviouralCompetencyCreateWithoutJob_profileInput {
  @Field(() => BehaviouralCompetencyCreateNestedOneWithoutJob_profilesInput, { nullable: false })
  behavioural_competency!: BehaviouralCompetencyCreateNestedOneWithoutJob_profilesInput;
}
