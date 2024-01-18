import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileScopeWhereUniqueInput } from './job-profile-scope-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileScopeCreateWithoutJob_profilesInput } from './job-profile-scope-create-without-job-profiles.input';

@InputType()
export class JobProfileScopeCreateOrConnectWithoutJob_profilesInput {
  @Field(() => JobProfileScopeWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileScopeWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileScopeWhereUniqueInput, 'id'>;

  @Field(() => JobProfileScopeCreateWithoutJob_profilesInput, { nullable: false })
  @Type(() => JobProfileScopeCreateWithoutJob_profilesInput)
  create!: JobProfileScopeCreateWithoutJob_profilesInput;
}
