import { Field, InputType, Int } from '@nestjs/graphql';
import { JobProfileUncheckedCreateNestedManyWithoutScopeInput } from '../job-profile/job-profile-unchecked-create-nested-many-without-scope.input';

@InputType()
export class JobProfileScopeUncheckedCreateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  description!: string;

  @Field(() => JobProfileUncheckedCreateNestedManyWithoutScopeInput, { nullable: true })
  job_profiles?: JobProfileUncheckedCreateNestedManyWithoutScopeInput;
}
