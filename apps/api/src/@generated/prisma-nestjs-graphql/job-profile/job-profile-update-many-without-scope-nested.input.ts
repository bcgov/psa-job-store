import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileCreateManyScopeInputEnvelope } from './job-profile-create-many-scope-input-envelope.input';
import { JobProfileCreateOrConnectWithoutScopeInput } from './job-profile-create-or-connect-without-scope.input';
import { JobProfileCreateWithoutScopeInput } from './job-profile-create-without-scope.input';
import { JobProfileScalarWhereInput } from './job-profile-scalar-where.input';
import { JobProfileUpdateManyWithWhereWithoutScopeInput } from './job-profile-update-many-with-where-without-scope.input';
import { JobProfileUpdateWithWhereUniqueWithoutScopeInput } from './job-profile-update-with-where-unique-without-scope.input';
import { JobProfileUpsertWithWhereUniqueWithoutScopeInput } from './job-profile-upsert-with-where-unique-without-scope.input';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileUpdateManyWithoutScopeNestedInput {
  @Field(() => [JobProfileCreateWithoutScopeInput], { nullable: true })
  @Type(() => JobProfileCreateWithoutScopeInput)
  create?: Array<JobProfileCreateWithoutScopeInput>;

  @Field(() => [JobProfileCreateOrConnectWithoutScopeInput], { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutScopeInput)
  connectOrCreate?: Array<JobProfileCreateOrConnectWithoutScopeInput>;

  @Field(() => [JobProfileUpsertWithWhereUniqueWithoutScopeInput], { nullable: true })
  @Type(() => JobProfileUpsertWithWhereUniqueWithoutScopeInput)
  upsert?: Array<JobProfileUpsertWithWhereUniqueWithoutScopeInput>;

  @Field(() => JobProfileCreateManyScopeInputEnvelope, { nullable: true })
  @Type(() => JobProfileCreateManyScopeInputEnvelope)
  createMany?: JobProfileCreateManyScopeInputEnvelope;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  set?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>>;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>>;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>>;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>>;

  @Field(() => [JobProfileUpdateWithWhereUniqueWithoutScopeInput], { nullable: true })
  @Type(() => JobProfileUpdateWithWhereUniqueWithoutScopeInput)
  update?: Array<JobProfileUpdateWithWhereUniqueWithoutScopeInput>;

  @Field(() => [JobProfileUpdateManyWithWhereWithoutScopeInput], { nullable: true })
  @Type(() => JobProfileUpdateManyWithWhereWithoutScopeInput)
  updateMany?: Array<JobProfileUpdateManyWithWhereWithoutScopeInput>;

  @Field(() => [JobProfileScalarWhereInput], { nullable: true })
  @Type(() => JobProfileScalarWhereInput)
  deleteMany?: Array<JobProfileScalarWhereInput>;
}
