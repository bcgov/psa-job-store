import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileScopeUpdateWithoutJob_profilesInput } from './job-profile-scope-update-without-job-profiles.input';
import { Type } from 'class-transformer';
import { JobProfileScopeCreateWithoutJob_profilesInput } from './job-profile-scope-create-without-job-profiles.input';
import { JobProfileScopeWhereInput } from './job-profile-scope-where.input';

@InputType()
export class JobProfileScopeUpsertWithoutJob_profilesInput {
  @Field(() => JobProfileScopeUpdateWithoutJob_profilesInput, { nullable: false })
  @Type(() => JobProfileScopeUpdateWithoutJob_profilesInput)
  update!: JobProfileScopeUpdateWithoutJob_profilesInput;

  @Field(() => JobProfileScopeCreateWithoutJob_profilesInput, { nullable: false })
  @Type(() => JobProfileScopeCreateWithoutJob_profilesInput)
  create!: JobProfileScopeCreateWithoutJob_profilesInput;

  @Field(() => JobProfileScopeWhereInput, { nullable: true })
  @Type(() => JobProfileScopeWhereInput)
  where?: JobProfileScopeWhereInput;
}
