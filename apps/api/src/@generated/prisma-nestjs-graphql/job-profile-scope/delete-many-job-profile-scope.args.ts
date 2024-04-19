import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileScopeWhereInput } from './job-profile-scope-where.input';

@ArgsType()
export class DeleteManyJobProfileScopeArgs {
  @Field(() => JobProfileScopeWhereInput, { nullable: true })
  @Type(() => JobProfileScopeWhereInput)
  where?: JobProfileScopeWhereInput;
}
