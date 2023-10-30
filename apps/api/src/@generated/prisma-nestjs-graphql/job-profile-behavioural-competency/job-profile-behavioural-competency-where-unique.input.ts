import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetencyBehavioural_competency_idJob_profile_idCompoundUniqueInput } from './job-profile-behavioural-competency-behavioural-competency-id-job-profile-id-compound-unique.input';
import { JobProfileBehaviouralCompetencyWhereInput } from './job-profile-behavioural-competency-where.input';
import { IntFilter } from '../prisma/int-filter.input';
import { BehaviouralCompetencyRelationFilter } from '../behavioural-competency/behavioural-competency-relation-filter.input';
import { JobProfileRelationFilter } from '../job-profile/job-profile-relation-filter.input';

@InputType()
export class JobProfileBehaviouralCompetencyWhereUniqueInput {
  @Field(() => JobProfileBehaviouralCompetencyBehavioural_competency_idJob_profile_idCompoundUniqueInput, {
    nullable: true,
  })
  behavioural_competency_id_job_profile_id?: JobProfileBehaviouralCompetencyBehavioural_competency_idJob_profile_idCompoundUniqueInput;

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
