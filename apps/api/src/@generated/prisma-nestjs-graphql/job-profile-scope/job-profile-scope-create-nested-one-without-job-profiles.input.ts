import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileScopeCreateWithoutJob_profilesInput } from './job-profile-scope-create-without-job-profiles.input';
import { Type } from 'class-transformer';
import { JobProfileScopeCreateOrConnectWithoutJob_profilesInput } from './job-profile-scope-create-or-connect-without-job-profiles.input';
import { Prisma } from '@prisma/client';
import { JobProfileScopeWhereUniqueInput } from './job-profile-scope-where-unique.input';

@InputType()
export class JobProfileScopeCreateNestedOneWithoutJob_profilesInput {
  @Field(() => JobProfileScopeCreateWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileScopeCreateWithoutJob_profilesInput)
  create?: JobProfileScopeCreateWithoutJob_profilesInput;

  @Field(() => JobProfileScopeCreateOrConnectWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileScopeCreateOrConnectWithoutJob_profilesInput)
  connectOrCreate?: JobProfileScopeCreateOrConnectWithoutJob_profilesInput;

  @Field(() => JobProfileScopeWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileScopeWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileScopeWhereUniqueInput, 'id'>;
}
