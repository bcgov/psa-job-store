import { Field, InputType } from '@nestjs/graphql';
import { JobProfileCreateNestedOneWithoutContextInput } from '../job-profile/job-profile-create-nested-one-without-context.input';

@InputType()
export class JobProfileContextCreateInput {
  @Field(() => String, { nullable: false })
  description!: string;

  @Field(() => JobProfileCreateNestedOneWithoutContextInput, { nullable: false })
  job_profile!: JobProfileCreateNestedOneWithoutContextInput;
}
