import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateNestedManyWithoutCareer_groupInput } from '../job-profile/job-profile-create-nested-many-without-career-group.input';

@InputType()
export class JobProfileCareerGroupCreateInput {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileCreateNestedManyWithoutCareer_groupInput, { nullable: true })
  job_profiles?: JobProfileCreateNestedManyWithoutCareer_groupInput;
}
