import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateNestedManyWithoutMinistryInput } from '../job-profile/job-profile-create-nested-many-without-ministry.input';
import { BehaviouralCompetencyCreateNestedManyWithoutMinistryInput } from '../behavioural-competency/behavioural-competency-create-nested-many-without-ministry.input';

@InputType()
export class MinistryCreateInput {
  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileCreateNestedManyWithoutMinistryInput, { nullable: true })
  job_profiles?: JobProfileCreateNestedManyWithoutMinistryInput;

  @Field(() => BehaviouralCompetencyCreateNestedManyWithoutMinistryInput, { nullable: true })
  BehaviouralCompetency?: BehaviouralCompetencyCreateNestedManyWithoutMinistryInput;
}
