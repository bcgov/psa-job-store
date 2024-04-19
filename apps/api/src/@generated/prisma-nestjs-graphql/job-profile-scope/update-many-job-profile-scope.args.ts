import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileScopeUpdateManyMutationInput } from './job-profile-scope-update-many-mutation.input';
import { JobProfileScopeWhereInput } from './job-profile-scope-where.input';

@ArgsType()
export class UpdateManyJobProfileScopeArgs {
  @Field(() => JobProfileScopeUpdateManyMutationInput, { nullable: false })
  @Type(() => JobProfileScopeUpdateManyMutationInput)
  data!: JobProfileScopeUpdateManyMutationInput;

  @Field(() => JobProfileScopeWhereInput, { nullable: true })
  @Type(() => JobProfileScopeWhereInput)
  where?: JobProfileScopeWhereInput;
}
