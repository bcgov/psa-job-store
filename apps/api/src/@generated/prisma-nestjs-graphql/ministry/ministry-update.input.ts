import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileUpdateManyWithoutMinistryNestedInput } from '../job-profile/job-profile-update-many-without-ministry-nested.input';
import { BehaviouralCompetencyUpdateManyWithoutMinistryNestedInput } from '../behavioural-competency/behavioural-competency-update-many-without-ministry-nested.input';

@InputType()
export class MinistryUpdateInput {
  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileUpdateManyWithoutMinistryNestedInput, { nullable: true })
  job_profiles?: JobProfileUpdateManyWithoutMinistryNestedInput;

  @Field(() => BehaviouralCompetencyUpdateManyWithoutMinistryNestedInput, { nullable: true })
  BehaviouralCompetency?: BehaviouralCompetencyUpdateManyWithoutMinistryNestedInput;
}
