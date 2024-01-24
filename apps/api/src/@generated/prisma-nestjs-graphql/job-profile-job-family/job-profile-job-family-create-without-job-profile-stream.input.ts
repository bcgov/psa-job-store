import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyLinkCreateNestedManyWithoutJobFamilyInput } from '../job-profile-job-family-link/job-profile-job-family-link-create-nested-many-without-job-family.input';

@InputType()
export class JobProfileJobFamilyCreateWithoutJobProfileStreamInput {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileJobFamilyLinkCreateNestedManyWithoutJobFamilyInput, { nullable: true })
  jobProfiles?: JobProfileJobFamilyLinkCreateNestedManyWithoutJobFamilyInput;
}
