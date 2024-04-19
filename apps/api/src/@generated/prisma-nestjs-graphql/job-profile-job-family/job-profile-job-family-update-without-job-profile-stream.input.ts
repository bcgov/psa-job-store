import { Field, InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyLinkUpdateManyWithoutJobFamilyNestedInput } from '../job-profile-job-family-link/job-profile-job-family-link-update-many-without-job-family-nested.input';

@InputType()
export class JobProfileJobFamilyUpdateWithoutJobProfileStreamInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileJobFamilyLinkUpdateManyWithoutJobFamilyNestedInput, { nullable: true })
  jobProfiles?: JobProfileJobFamilyLinkUpdateManyWithoutJobFamilyNestedInput;
}
