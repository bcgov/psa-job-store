import { Field, InputType, Int } from '@nestjs/graphql';
import { JobProfileJobFamilyLinkUncheckedCreateNestedManyWithoutJobFamilyInput } from '../job-profile-job-family-link/job-profile-job-family-link-unchecked-create-nested-many-without-job-family.input';

@InputType()
export class JobProfileJobFamilyUncheckedCreateWithoutJobProfileStreamInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileJobFamilyLinkUncheckedCreateNestedManyWithoutJobFamilyInput, { nullable: true })
  jobProfiles?: JobProfileJobFamilyLinkUncheckedCreateNestedManyWithoutJobFamilyInput;
}
