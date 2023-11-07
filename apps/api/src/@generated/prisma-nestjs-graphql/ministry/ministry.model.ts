import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfile } from '../job-profile/job-profile.model';
import { BehaviouralCompetency } from '../behavioural-competency/behavioural-competency.model';

@ObjectType()
export class Ministry {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => [JobProfile], { nullable: true })
  job_profiles?: Array<JobProfile>;

  @Field(() => [BehaviouralCompetency], { nullable: true })
  BehaviouralCompetency?: Array<BehaviouralCompetency>;
}
