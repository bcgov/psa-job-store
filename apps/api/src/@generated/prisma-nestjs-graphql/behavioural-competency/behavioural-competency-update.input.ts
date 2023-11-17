import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyMembership } from '../prisma/behavioural-competency-membership.enum';
import { BehaviouralCompetencyGroup } from '../prisma/behavioural-competency-group.enum';
import { JobProfileBehaviouralCompetencyUpdateManyWithoutBehavioural_competencyNestedInput } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-update-many-without-behavioural-competency-nested.input';

@InputType()
export class BehaviouralCompetencyUpdateInput {
  @Field(() => BehaviouralCompetencyMembership, { nullable: true })
  membership?: keyof typeof BehaviouralCompetencyMembership;

  @Field(() => BehaviouralCompetencyGroup, { nullable: true })
  group?: keyof typeof BehaviouralCompetencyGroup;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => JobProfileBehaviouralCompetencyUpdateManyWithoutBehavioural_competencyNestedInput, { nullable: true })
  job_profiles?: JobProfileBehaviouralCompetencyUpdateManyWithoutBehavioural_competencyNestedInput;
}
