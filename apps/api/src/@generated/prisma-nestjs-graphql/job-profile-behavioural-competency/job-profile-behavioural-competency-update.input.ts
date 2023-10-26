import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyUpdateOneRequiredWithoutJob_profilesNestedInput } from '../behavioural-competency/behavioural-competency-update-one-required-without-job-profiles-nested.input';
import { JobProfileUpdateOneRequiredWithoutBehavioural_competenciesNestedInput } from '../job-profile/job-profile-update-one-required-without-behavioural-competencies-nested.input';

@InputType()
export class JobProfileBehaviouralCompetencyUpdateInput {
  @Field(() => BehaviouralCompetencyUpdateOneRequiredWithoutJob_profilesNestedInput, { nullable: true })
  behavioral_competency?: BehaviouralCompetencyUpdateOneRequiredWithoutJob_profilesNestedInput;

  @Field(() => JobProfileUpdateOneRequiredWithoutBehavioural_competenciesNestedInput, { nullable: true })
  job_profile?: JobProfileUpdateOneRequiredWithoutBehavioural_competenciesNestedInput;
}
