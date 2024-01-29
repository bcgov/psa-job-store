import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileStreamUncheckedCreateNestedManyWithoutJob_familyInput } from '../job-profile-stream/job-profile-stream-unchecked-create-nested-many-without-job-family.input';

@InputType()
export class JobProfileJobFamilyUncheckedCreateWithoutJobProfilesInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileStreamUncheckedCreateNestedManyWithoutJob_familyInput, { nullable: true })
  JobProfileStream?: JobProfileStreamUncheckedCreateNestedManyWithoutJob_familyInput;
}
