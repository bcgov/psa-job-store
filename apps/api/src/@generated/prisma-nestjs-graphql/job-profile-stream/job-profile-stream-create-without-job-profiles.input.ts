import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyCreateNestedOneWithoutJobProfileStreamInput } from '../job-profile-job-family/job-profile-job-family-create-nested-one-without-job-profile-stream.input';

@InputType()
export class JobProfileStreamCreateWithoutJob_profilesInput {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileJobFamilyCreateNestedOneWithoutJobProfileStreamInput, { nullable: false })
  job_family!: JobProfileJobFamilyCreateNestedOneWithoutJobProfileStreamInput;
}
