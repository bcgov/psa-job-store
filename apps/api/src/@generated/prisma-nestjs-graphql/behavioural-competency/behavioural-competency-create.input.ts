import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetencyCreateNestedManyWithoutBehavioral_competencyInput } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-create-nested-many-without-behavioral-competency.input';

@InputType()
export class BehaviouralCompetencyCreateInput {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  description!: string;

  @Field(() => JobProfileBehaviouralCompetencyCreateNestedManyWithoutBehavioral_competencyInput, { nullable: true })
  job_profiles?: JobProfileBehaviouralCompetencyCreateNestedManyWithoutBehavioral_competencyInput;
}
