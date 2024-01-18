import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateNestedManyWithoutScopeInput } from '../job-profile/job-profile-create-nested-many-without-scope.input';

@InputType()
export class JobProfileScopeCreateInput {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  description!: string;

  @Field(() => JobProfileCreateNestedManyWithoutScopeInput, { nullable: true })
  job_profiles?: JobProfileCreateNestedManyWithoutScopeInput;
}
