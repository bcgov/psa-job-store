import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class JobProfileBehaviouralCompetencyMaxAggregate {
  @Field(() => Int, { nullable: true })
  behavioural_competency_id?: number;

  @Field(() => Int, { nullable: true })
  job_profile_id?: number;
}
