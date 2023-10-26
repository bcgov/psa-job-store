import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyCreateNestedOneWithoutJob_profilesInput } from '../behavioural-competency/behavioural-competency-create-nested-one-without-job-profiles.input';
import { JobProfileCreateNestedOneWithoutBehavioural_competenciesInput } from '../job-profile/job-profile-create-nested-one-without-behavioural-competencies.input';

@InputType()
export class JobProfileBehaviouralCompetencyCreateInput {
  @Field(() => BehaviouralCompetencyCreateNestedOneWithoutJob_profilesInput, { nullable: false })
  behavioral_competency!: BehaviouralCompetencyCreateNestedOneWithoutJob_profilesInput;

  @Field(() => JobProfileCreateNestedOneWithoutBehavioural_competenciesInput, { nullable: false })
  job_profile!: JobProfileCreateNestedOneWithoutBehavioural_competenciesInput;
}
