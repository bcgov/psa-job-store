import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetencyUncheckedUpdateManyWithoutBehavioral_competencyNestedInput } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-unchecked-update-many-without-behavioral-competency-nested.input';

@InputType()
export class BehaviouralCompetencyUncheckedUpdateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => JobProfileBehaviouralCompetencyUncheckedUpdateManyWithoutBehavioral_competencyNestedInput, {
    nullable: true,
  })
  job_profiles?: JobProfileBehaviouralCompetencyUncheckedUpdateManyWithoutBehavioral_competencyNestedInput;
}
