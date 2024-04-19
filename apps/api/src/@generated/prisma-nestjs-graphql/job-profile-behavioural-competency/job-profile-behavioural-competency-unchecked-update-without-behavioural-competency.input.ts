import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileBehaviouralCompetencyUncheckedUpdateWithoutBehavioural_competencyInput {
  @Field(() => Int, { nullable: true })
  job_profile_id?: number;
}
