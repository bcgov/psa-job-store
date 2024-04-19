import { Field, InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyCreateNestedOneWithoutJobProfileStreamInput } from '../job-profile-job-family/job-profile-job-family-create-nested-one-without-job-profile-stream.input';
import { JobProfileStreamLinkCreateNestedManyWithoutStreamInput } from '../job-profile-stream-link/job-profile-stream-link-create-nested-many-without-stream.input';

@InputType()
export class JobProfileStreamCreateInput {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileJobFamilyCreateNestedOneWithoutJobProfileStreamInput, { nullable: false })
  job_family!: JobProfileJobFamilyCreateNestedOneWithoutJobProfileStreamInput;

  @Field(() => JobProfileStreamLinkCreateNestedManyWithoutStreamInput, { nullable: true })
  jobProfiles?: JobProfileStreamLinkCreateNestedManyWithoutStreamInput;
}
