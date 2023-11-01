import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { BehaviouralCompetencyMembership } from '../prisma/behavioural-competency-membership.enum';
import { BehaviouralCompetencyGroup } from '../prisma/behavioural-competency-group.enum';
import { JobProfileBehaviouralCompetencyUncheckedCreateNestedManyWithoutBehavioural_competencyInput } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-unchecked-create-nested-many-without-behavioural-competency.input';

@InputType()
export class BehaviouralCompetencyUncheckedCreateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  ministry_id?: number;

  @Field(() => BehaviouralCompetencyMembership, { nullable: false })
  membership!: keyof typeof BehaviouralCompetencyMembership;

  @Field(() => BehaviouralCompetencyGroup, { nullable: false })
  group!: keyof typeof BehaviouralCompetencyGroup;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  description!: string;

  @Field(() => JobProfileBehaviouralCompetencyUncheckedCreateNestedManyWithoutBehavioural_competencyInput, {
    nullable: true,
  })
  job_profiles?: JobProfileBehaviouralCompetencyUncheckedCreateNestedManyWithoutBehavioural_competencyInput;
}
