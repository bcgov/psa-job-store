import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileBehaviouralCompetencyCreateManyBehavioural_competencyInput {
  @Field(() => Int, { nullable: false })
  job_profile_id!: number;
}
