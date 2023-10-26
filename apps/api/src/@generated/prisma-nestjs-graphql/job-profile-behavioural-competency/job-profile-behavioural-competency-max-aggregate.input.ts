import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileBehaviouralCompetencyMaxAggregateInput {
  @Field(() => Boolean, { nullable: true })
  behavioural_competency_id?: true;

  @Field(() => Boolean, { nullable: true })
  job_profile_id?: true;
}
