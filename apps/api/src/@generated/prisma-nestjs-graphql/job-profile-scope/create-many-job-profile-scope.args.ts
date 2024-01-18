import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileScopeCreateManyInput } from './job-profile-scope-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyJobProfileScopeArgs {
  @Field(() => [JobProfileScopeCreateManyInput], { nullable: false })
  @Type(() => JobProfileScopeCreateManyInput)
  data!: Array<JobProfileScopeCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
