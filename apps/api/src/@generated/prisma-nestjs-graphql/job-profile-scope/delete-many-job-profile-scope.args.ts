import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileScopeWhereInput } from './job-profile-scope-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyJobProfileScopeArgs {
  @Field(() => JobProfileScopeWhereInput, { nullable: true })
  @Type(() => JobProfileScopeWhereInput)
  where?: JobProfileScopeWhereInput;
}
