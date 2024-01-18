import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileScopeCreateInput } from './job-profile-scope-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneJobProfileScopeArgs {
  @Field(() => JobProfileScopeCreateInput, { nullable: false })
  @Type(() => JobProfileScopeCreateInput)
  data!: JobProfileScopeCreateInput;
}
