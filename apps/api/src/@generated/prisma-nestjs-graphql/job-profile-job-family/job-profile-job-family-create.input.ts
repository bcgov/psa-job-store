import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyLinkCreateNestedManyWithoutJobFamilyInput } from '../job-profile-job-family-link/job-profile-job-family-link-create-nested-many-without-job-family.input';
import { JobProfileStreamCreateNestedManyWithoutJob_familyInput } from '../job-profile-stream/job-profile-stream-create-nested-many-without-job-family.input';

@InputType()
export class JobProfileJobFamilyCreateInput {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileJobFamilyLinkCreateNestedManyWithoutJobFamilyInput, { nullable: true })
  jobProfiles?: JobProfileJobFamilyLinkCreateNestedManyWithoutJobFamilyInput;

  @Field(() => JobProfileStreamCreateNestedManyWithoutJob_familyInput, { nullable: true })
  JobProfileStream?: JobProfileStreamCreateNestedManyWithoutJob_familyInput;
}
