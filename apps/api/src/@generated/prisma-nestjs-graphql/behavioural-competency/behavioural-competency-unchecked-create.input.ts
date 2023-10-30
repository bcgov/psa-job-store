import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetencyUncheckedCreateNestedManyWithoutBehavioural_competencyInput } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-unchecked-create-nested-many-without-behavioural-competency.input';

@InputType()
export class BehaviouralCompetencyUncheckedCreateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  description!: string;

  @Field(() => JobProfileBehaviouralCompetencyUncheckedCreateNestedManyWithoutBehavioural_competencyInput, {
    nullable: true,
  })
  job_profiles?: JobProfileBehaviouralCompetencyUncheckedCreateNestedManyWithoutBehavioural_competencyInput;
}
