import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyCreateNestedOneWithoutJobProfileStreamInput } from '../job-profile-job-family/job-profile-job-family-create-nested-one-without-job-profile-stream.input';
import { JobProfileCreateNestedManyWithoutStreamInput } from '../job-profile/job-profile-create-nested-many-without-stream.input';

@InputType()
export class JobProfileStreamCreateInput {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileJobFamilyCreateNestedOneWithoutJobProfileStreamInput, { nullable: false })
  job_family!: JobProfileJobFamilyCreateNestedOneWithoutJobProfileStreamInput;

  @Field(() => JobProfileCreateNestedManyWithoutStreamInput, { nullable: true })
  job_profiles?: JobProfileCreateNestedManyWithoutStreamInput;
}
