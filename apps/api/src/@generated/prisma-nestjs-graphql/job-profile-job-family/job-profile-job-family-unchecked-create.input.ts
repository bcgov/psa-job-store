import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileUncheckedCreateNestedManyWithoutJob_familyInput } from '../job-profile/job-profile-unchecked-create-nested-many-without-job-family.input';
import { JobProfileStreamUncheckedCreateNestedManyWithoutJob_familyInput } from '../job-profile-stream/job-profile-stream-unchecked-create-nested-many-without-job-family.input';

@InputType()
export class JobProfileJobFamilyUncheckedCreateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileUncheckedCreateNestedManyWithoutJob_familyInput, { nullable: true })
  job_profiles?: JobProfileUncheckedCreateNestedManyWithoutJob_familyInput;

  @Field(() => JobProfileStreamUncheckedCreateNestedManyWithoutJob_familyInput, { nullable: true })
  JobProfileStream?: JobProfileStreamUncheckedCreateNestedManyWithoutJob_familyInput;
}
