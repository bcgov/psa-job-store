import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileScopeWhereInput } from './job-profile-scope-where.input';
import { Type } from 'class-transformer';
import { JobProfileScopeUpdateWithoutJob_profilesInput } from './job-profile-scope-update-without-job-profiles.input';

@InputType()
export class JobProfileScopeUpdateToOneWithWhereWithoutJob_profilesInput {
  @Field(() => JobProfileScopeWhereInput, { nullable: true })
  @Type(() => JobProfileScopeWhereInput)
  where?: JobProfileScopeWhereInput;

  @Field(() => JobProfileScopeUpdateWithoutJob_profilesInput, { nullable: false })
  @Type(() => JobProfileScopeUpdateWithoutJob_profilesInput)
  data!: JobProfileScopeUpdateWithoutJob_profilesInput;
}
