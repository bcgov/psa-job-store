import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { BehaviouralCompetencyMembership } from '../prisma/behavioural-competency-membership.enum';
import { BehaviouralCompetencyGroup } from '../prisma/behavioural-competency-group.enum';
import { JobProfileBehaviouralCompetency } from '../job-profile-behavioural-competency/job-profile-behavioural-competency.model';
import { Ministry } from '../ministry/ministry.model';

@ObjectType()
export class BehaviouralCompetency {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: true })
  ministry_id!: number | null;

  @Field(() => BehaviouralCompetencyMembership, { nullable: false })
  membership!: keyof typeof BehaviouralCompetencyMembership;

  @Field(() => BehaviouralCompetencyGroup, { nullable: false })
  group!: keyof typeof BehaviouralCompetencyGroup;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  description!: string;

  @Field(() => [JobProfileBehaviouralCompetency], { nullable: true })
  job_profiles?: Array<JobProfileBehaviouralCompetency>;

  @Field(() => Ministry, { nullable: true })
  ministry?: Ministry | null;
}
