import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileUncheckedCreateNestedManyWithoutStreamInput } from '../job-profile/job-profile-unchecked-create-nested-many-without-stream.input';

@InputType()
export class JobProfileStreamUncheckedCreateWithoutJob_familyInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileUncheckedCreateNestedManyWithoutStreamInput, { nullable: true })
  job_profiles?: JobProfileUncheckedCreateNestedManyWithoutStreamInput;
}
