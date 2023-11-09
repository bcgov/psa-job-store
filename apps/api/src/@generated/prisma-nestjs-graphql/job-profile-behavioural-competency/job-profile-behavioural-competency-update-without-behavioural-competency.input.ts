import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileUpdateOneRequiredWithoutBehavioural_competenciesNestedInput } from '../job-profile/job-profile-update-one-required-without-behavioural-competencies-nested.input';

@InputType()
export class JobProfileBehaviouralCompetencyUpdateWithoutBehavioural_competencyInput {
  @Field(() => JobProfileUpdateOneRequiredWithoutBehavioural_competenciesNestedInput, { nullable: true })
  job_profile?: JobProfileUpdateOneRequiredWithoutBehavioural_competenciesNestedInput;
}
