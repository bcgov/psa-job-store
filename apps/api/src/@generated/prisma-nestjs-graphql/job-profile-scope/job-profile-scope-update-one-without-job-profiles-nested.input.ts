import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileScopeCreateWithoutJob_profilesInput } from './job-profile-scope-create-without-job-profiles.input';
import { Type } from 'class-transformer';
import { JobProfileScopeCreateOrConnectWithoutJob_profilesInput } from './job-profile-scope-create-or-connect-without-job-profiles.input';
import { JobProfileScopeUpsertWithoutJob_profilesInput } from './job-profile-scope-upsert-without-job-profiles.input';
import { JobProfileScopeWhereInput } from './job-profile-scope-where.input';
import { Prisma } from '@prisma/client';
import { JobProfileScopeWhereUniqueInput } from './job-profile-scope-where-unique.input';
import { JobProfileScopeUpdateToOneWithWhereWithoutJob_profilesInput } from './job-profile-scope-update-to-one-with-where-without-job-profiles.input';

@InputType()
export class JobProfileScopeUpdateOneWithoutJob_profilesNestedInput {
  @Field(() => JobProfileScopeCreateWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileScopeCreateWithoutJob_profilesInput)
  create?: JobProfileScopeCreateWithoutJob_profilesInput;

  @Field(() => JobProfileScopeCreateOrConnectWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileScopeCreateOrConnectWithoutJob_profilesInput)
  connectOrCreate?: JobProfileScopeCreateOrConnectWithoutJob_profilesInput;

  @Field(() => JobProfileScopeUpsertWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileScopeUpsertWithoutJob_profilesInput)
  upsert?: JobProfileScopeUpsertWithoutJob_profilesInput;

  @Field(() => JobProfileScopeWhereInput, { nullable: true })
  @Type(() => JobProfileScopeWhereInput)
  disconnect?: JobProfileScopeWhereInput;

  @Field(() => JobProfileScopeWhereInput, { nullable: true })
  @Type(() => JobProfileScopeWhereInput)
  delete?: JobProfileScopeWhereInput;

  @Field(() => JobProfileScopeWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileScopeWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileScopeWhereUniqueInput, 'id'>;

  @Field(() => JobProfileScopeUpdateToOneWithWhereWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileScopeUpdateToOneWithWhereWithoutJob_profilesInput)
  update?: JobProfileScopeUpdateToOneWithWhereWithoutJob_profilesInput;
}
