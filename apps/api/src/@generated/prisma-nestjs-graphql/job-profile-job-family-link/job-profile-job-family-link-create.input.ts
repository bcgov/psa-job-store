import { Field, InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyCreateNestedOneWithoutJobProfilesInput } from '../job-profile-job-family/job-profile-job-family-create-nested-one-without-job-profiles.input';
import { JobProfileCreateNestedOneWithoutJobFamiliesInput } from '../job-profile/job-profile-create-nested-one-without-job-families.input';

@InputType()
export class JobProfileJobFamilyLinkCreateInput {
  @Field(() => JobProfileCreateNestedOneWithoutJobFamiliesInput, { nullable: false })
  jobProfile!: JobProfileCreateNestedOneWithoutJobFamiliesInput;

  @Field(() => JobProfileJobFamilyCreateNestedOneWithoutJobProfilesInput, { nullable: false })
  jobFamily!: JobProfileJobFamilyCreateNestedOneWithoutJobProfilesInput;
}
