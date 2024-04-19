import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileBehaviouralCompetencyCreateManyInput {
  @Field(() => Int, { nullable: false })
  behavioural_competency_id!: number;

  @Field(() => Int, { nullable: false })
  job_profile_id!: number;
}
