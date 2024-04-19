import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileBehaviouralCompetencyUncheckedCreateWithoutBehavioural_competencyInput {
  @Field(() => Int, { nullable: false })
  job_profile_id!: number;
}
