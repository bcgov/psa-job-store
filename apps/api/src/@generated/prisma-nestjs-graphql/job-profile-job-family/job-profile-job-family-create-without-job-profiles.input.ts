import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileStreamCreateNestedManyWithoutJob_familyInput } from '../job-profile-stream/job-profile-stream-create-nested-many-without-job-family.input';

@InputType()
export class JobProfileJobFamilyCreateWithoutJob_profilesInput {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileStreamCreateNestedManyWithoutJob_familyInput, { nullable: true })
  JobProfileStream?: JobProfileStreamCreateNestedManyWithoutJob_familyInput;
}
