import { Field, InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyRelationFilter } from '../behavioural-competency/behavioural-competency-relation-filter.input';
import { JobProfileRelationFilter } from '../job-profile/job-profile-relation-filter.input';
import { IntFilter } from '../prisma/int-filter.input';

@InputType()
export class JobProfileBehaviouralCompetencyWhereInput {
  @Field(() => [JobProfileBehaviouralCompetencyWhereInput], { nullable: true })
  AND?: Array<JobProfileBehaviouralCompetencyWhereInput>;

  @Field(() => [JobProfileBehaviouralCompetencyWhereInput], { nullable: true })
  OR?: Array<JobProfileBehaviouralCompetencyWhereInput>;

  @Field(() => [JobProfileBehaviouralCompetencyWhereInput], { nullable: true })
  NOT?: Array<JobProfileBehaviouralCompetencyWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  behavioural_competency_id?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  job_profile_id?: IntFilter;

  @Field(() => BehaviouralCompetencyRelationFilter, { nullable: true })
  behavioural_competency?: BehaviouralCompetencyRelationFilter;

  @Field(() => JobProfileRelationFilter, { nullable: true })
  job_profile?: JobProfileRelationFilter;
}
