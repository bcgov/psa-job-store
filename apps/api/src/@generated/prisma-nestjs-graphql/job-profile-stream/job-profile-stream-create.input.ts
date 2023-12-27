import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateNestedManyWithoutStreamInput } from '../job-profile/job-profile-create-nested-many-without-stream.input';

@InputType()
export class JobProfileStreamCreateInput {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileCreateNestedManyWithoutStreamInput, { nullable: true })
  job_profiles?: JobProfileCreateNestedManyWithoutStreamInput;
}
