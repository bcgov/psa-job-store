import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetencyUpdateManyWithoutBehavioral_competencyNestedInput } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-update-many-without-behavioral-competency-nested.input';

@InputType()
export class BehaviouralCompetencyUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => JobProfileBehaviouralCompetencyUpdateManyWithoutBehavioral_competencyNestedInput, { nullable: true })
  job_profiles?: JobProfileBehaviouralCompetencyUpdateManyWithoutBehavioral_competencyNestedInput;
}
