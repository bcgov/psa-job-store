import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileBehaviouralCompetencySumAggregateInput {
  @Field(() => Boolean, { nullable: true })
  behavioural_competency_id?: true;

  @Field(() => Boolean, { nullable: true })
  job_profile_id?: true;
}
