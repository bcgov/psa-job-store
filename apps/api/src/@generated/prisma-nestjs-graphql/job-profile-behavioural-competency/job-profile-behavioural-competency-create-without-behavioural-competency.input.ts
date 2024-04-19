import { Field, InputType } from '@nestjs/graphql';
import { JobProfileCreateNestedOneWithoutBehavioural_competenciesInput } from '../job-profile/job-profile-create-nested-one-without-behavioural-competencies.input';

@InputType()
export class JobProfileBehaviouralCompetencyCreateWithoutBehavioural_competencyInput {
  @Field(() => JobProfileCreateNestedOneWithoutBehavioural_competenciesInput, { nullable: false })
  job_profile!: JobProfileCreateNestedOneWithoutBehavioural_competenciesInput;
}
