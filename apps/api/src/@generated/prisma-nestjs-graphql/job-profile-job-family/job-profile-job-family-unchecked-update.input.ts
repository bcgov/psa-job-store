import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileJobFamilyLinkUncheckedUpdateManyWithoutJobFamilyNestedInput } from '../job-profile-job-family-link/job-profile-job-family-link-unchecked-update-many-without-job-family-nested.input';
import { JobProfileStreamUncheckedUpdateManyWithoutJob_familyNestedInput } from '../job-profile-stream/job-profile-stream-unchecked-update-many-without-job-family-nested.input';

@InputType()
export class JobProfileJobFamilyUncheckedUpdateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileJobFamilyLinkUncheckedUpdateManyWithoutJobFamilyNestedInput, { nullable: true })
  jobProfiles?: JobProfileJobFamilyLinkUncheckedUpdateManyWithoutJobFamilyNestedInput;

  @Field(() => JobProfileStreamUncheckedUpdateManyWithoutJob_familyNestedInput, { nullable: true })
  JobProfileStream?: JobProfileStreamUncheckedUpdateManyWithoutJob_familyNestedInput;
}
