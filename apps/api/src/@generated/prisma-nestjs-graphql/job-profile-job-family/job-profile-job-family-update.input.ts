import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyLinkUpdateManyWithoutJobFamilyNestedInput } from '../job-profile-job-family-link/job-profile-job-family-link-update-many-without-job-family-nested.input';
import { JobProfileStreamUpdateManyWithoutJob_familyNestedInput } from '../job-profile-stream/job-profile-stream-update-many-without-job-family-nested.input';

@InputType()
export class JobProfileJobFamilyUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileJobFamilyLinkUpdateManyWithoutJobFamilyNestedInput, { nullable: true })
  jobProfiles?: JobProfileJobFamilyLinkUpdateManyWithoutJobFamilyNestedInput;

  @Field(() => JobProfileStreamUpdateManyWithoutJob_familyNestedInput, { nullable: true })
  JobProfileStream?: JobProfileStreamUpdateManyWithoutJob_familyNestedInput;
}
