import { Field, InputType, Int } from '@nestjs/graphql';
import { JobProfileJobFamilyLinkUncheckedCreateNestedManyWithoutJobFamilyInput } from '../job-profile-job-family-link/job-profile-job-family-link-unchecked-create-nested-many-without-job-family.input';
import { JobProfileStreamUncheckedCreateNestedManyWithoutJob_familyInput } from '../job-profile-stream/job-profile-stream-unchecked-create-nested-many-without-job-family.input';

@InputType()
export class JobProfileJobFamilyUncheckedCreateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileJobFamilyLinkUncheckedCreateNestedManyWithoutJobFamilyInput, { nullable: true })
  jobProfiles?: JobProfileJobFamilyLinkUncheckedCreateNestedManyWithoutJobFamilyInput;

  @Field(() => JobProfileStreamUncheckedCreateNestedManyWithoutJob_familyInput, { nullable: true })
  JobProfileStream?: JobProfileStreamUncheckedCreateNestedManyWithoutJob_familyInput;
}
