import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyCreateNestedOneWithoutJobProfilesInput } from '../job-profile-job-family/job-profile-job-family-create-nested-one-without-job-profiles.input';

@InputType()
export class JobProfileJobFamilyLinkCreateWithoutJobProfileInput {
  @Field(() => JobProfileJobFamilyCreateNestedOneWithoutJobProfilesInput, { nullable: false })
  jobFamily!: JobProfileJobFamilyCreateNestedOneWithoutJobProfilesInput;
}
