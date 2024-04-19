import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BehaviouralCompetency } from '../behavioural-competency/behavioural-competency.model';
import { JobProfile } from '../job-profile/job-profile.model';

@ObjectType()
export class JobProfileBehaviouralCompetency {
  @Field(() => Int, { nullable: false })
  behavioural_competency_id!: number;

  @Field(() => Int, { nullable: false })
  job_profile_id!: number;

  @Field(() => BehaviouralCompetency, { nullable: false })
  behavioural_competency?: BehaviouralCompetency;

  @Field(() => JobProfile, { nullable: false })
  job_profile?: JobProfile;
}
