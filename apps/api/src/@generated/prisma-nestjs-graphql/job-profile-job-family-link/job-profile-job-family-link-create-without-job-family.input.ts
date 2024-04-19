import { Field, InputType } from '@nestjs/graphql';
import { JobProfileCreateNestedOneWithoutJobFamiliesInput } from '../job-profile/job-profile-create-nested-one-without-job-families.input';

@InputType()
export class JobProfileJobFamilyLinkCreateWithoutJobFamilyInput {
  @Field(() => JobProfileCreateNestedOneWithoutJobFamiliesInput, { nullable: false })
  jobProfile!: JobProfileCreateNestedOneWithoutJobFamiliesInput;
}
