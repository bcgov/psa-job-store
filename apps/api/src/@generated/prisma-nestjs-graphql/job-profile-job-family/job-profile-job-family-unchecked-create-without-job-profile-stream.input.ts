import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileUncheckedCreateNestedManyWithoutJob_familyInput } from '../job-profile/job-profile-unchecked-create-nested-many-without-job-family.input';

@InputType()
export class JobProfileJobFamilyUncheckedCreateWithoutJobProfileStreamInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileUncheckedCreateNestedManyWithoutJob_familyInput, { nullable: true })
  job_profiles?: JobProfileUncheckedCreateNestedManyWithoutJob_familyInput;
}
