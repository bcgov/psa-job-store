import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class JobProfileBehaviouralCompetencyCountAggregate {
  @Field(() => Int, { nullable: false })
  behavioural_competency_id!: number;

  @Field(() => Int, { nullable: false })
  job_profile_id!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
