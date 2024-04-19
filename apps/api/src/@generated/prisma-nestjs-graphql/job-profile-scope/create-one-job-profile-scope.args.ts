import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileScopeCreateInput } from './job-profile-scope-create.input';

@ArgsType()
export class CreateOneJobProfileScopeArgs {
  @Field(() => JobProfileScopeCreateInput, { nullable: false })
  @Type(() => JobProfileScopeCreateInput)
  data!: JobProfileScopeCreateInput;
}
