import { Field, InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyCreateNestedOneWithoutJobProfileStreamInput } from '../job-profile-job-family/job-profile-job-family-create-nested-one-without-job-profile-stream.input';

@InputType()
export class JobProfileStreamCreateWithoutJobProfilesInput {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileJobFamilyCreateNestedOneWithoutJobProfileStreamInput, { nullable: false })
  job_family!: JobProfileJobFamilyCreateNestedOneWithoutJobProfileStreamInput;
}
