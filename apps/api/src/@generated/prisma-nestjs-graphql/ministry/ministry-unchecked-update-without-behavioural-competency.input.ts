import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileUncheckedUpdateManyWithoutMinistryNestedInput } from '../job-profile/job-profile-unchecked-update-many-without-ministry-nested.input';

@InputType()
export class MinistryUncheckedUpdateWithoutBehaviouralCompetencyInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileUncheckedUpdateManyWithoutMinistryNestedInput, { nullable: true })
  job_profiles?: JobProfileUncheckedUpdateManyWithoutMinistryNestedInput;
}
