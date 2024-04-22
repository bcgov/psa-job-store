import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileScopeCreateOrConnectWithoutJob_profilesInput } from './job-profile-scope-create-or-connect-without-job-profiles.input';
import { JobProfileScopeCreateWithoutJob_profilesInput } from './job-profile-scope-create-without-job-profiles.input';
import { JobProfileScopeUpdateToOneWithWhereWithoutJob_profilesInput } from './job-profile-scope-update-to-one-with-where-without-job-profiles.input';
import { JobProfileScopeUpsertWithoutJob_profilesInput } from './job-profile-scope-upsert-without-job-profiles.input';
import { JobProfileScopeWhereUniqueInput } from './job-profile-scope-where-unique.input';
import { JobProfileScopeWhereInput } from './job-profile-scope-where.input';

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
