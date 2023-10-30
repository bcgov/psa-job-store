import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetencyUpdateManyWithoutBehavioural_competencyNestedInput } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-update-many-without-behavioural-competency-nested.input';

@InputType()
export class BehaviouralCompetencyUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => JobProfileBehaviouralCompetencyUpdateManyWithoutBehavioural_competencyNestedInput, { nullable: true })
  job_profiles?: JobProfileBehaviouralCompetencyUpdateManyWithoutBehavioural_competencyNestedInput;
}
