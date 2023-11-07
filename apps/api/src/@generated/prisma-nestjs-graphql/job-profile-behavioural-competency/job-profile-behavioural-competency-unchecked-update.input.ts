import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class JobProfileBehaviouralCompetencyUncheckedUpdateInput {
  @Field(() => Int, { nullable: true })
  behavioural_competency_id?: number;

  @Field(() => Int, { nullable: true })
  job_profile_id?: number;
}
