import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileUpdateManyWithoutCareer_groupNestedInput } from '../job-profile/job-profile-update-many-without-career-group-nested.input';

@InputType()
export class JobProfileCareerGroupUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileUpdateManyWithoutCareer_groupNestedInput, { nullable: true })
  job_profiles?: JobProfileUpdateManyWithoutCareer_groupNestedInput;
}
