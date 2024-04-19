import { Field, InputType, Int } from '@nestjs/graphql';
import { JobProfileJobFamilyLinkUncheckedUpdateManyWithoutJobFamilyNestedInput } from '../job-profile-job-family-link/job-profile-job-family-link-unchecked-update-many-without-job-family-nested.input';

@InputType()
export class JobProfileJobFamilyUncheckedUpdateWithoutJobProfileStreamInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileJobFamilyLinkUncheckedUpdateManyWithoutJobFamilyNestedInput, { nullable: true })
  jobProfiles?: JobProfileJobFamilyLinkUncheckedUpdateManyWithoutJobFamilyNestedInput;
}
