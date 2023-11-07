import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class JobProfileBehaviouralCompetencyAvgAggregate {
  @Field(() => Float, { nullable: true })
  behavioural_competency_id?: number;

  @Field(() => Float, { nullable: true })
  job_profile_id?: number;
}
