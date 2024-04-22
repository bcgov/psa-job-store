import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileScopeCreateManyInput } from './job-profile-scope-create-many.input';

@ArgsType()
export class CreateManyJobProfileScopeArgs {
  @Field(() => [JobProfileScopeCreateManyInput], { nullable: false })
  @Type(() => JobProfileScopeCreateManyInput)
  data!: Array<JobProfileScopeCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
