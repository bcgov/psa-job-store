import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetency } from '../job-profile-behavioural-competency/job-profile-behavioural-competency.model';

@ObjectType()
export class BehaviouralCompetency {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  description!: string;

  @Field(() => [JobProfileBehaviouralCompetency], { nullable: true })
  job_profiles?: Array<JobProfileBehaviouralCompetency>;
}
