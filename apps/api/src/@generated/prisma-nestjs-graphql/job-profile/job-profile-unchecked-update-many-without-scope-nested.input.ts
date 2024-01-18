import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutScopeInput } from './job-profile-create-without-scope.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutScopeInput } from './job-profile-create-or-connect-without-scope.input';
import { JobProfileUpsertWithWhereUniqueWithoutScopeInput } from './job-profile-upsert-with-where-unique-without-scope.input';
import { JobProfileCreateManyScopeInputEnvelope } from './job-profile-create-many-scope-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { JobProfileUpdateWithWhereUniqueWithoutScopeInput } from './job-profile-update-with-where-unique-without-scope.input';
import { JobProfileUpdateManyWithWhereWithoutScopeInput } from './job-profile-update-many-with-where-without-scope.input';
import { JobProfileScalarWhereInput } from './job-profile-scalar-where.input';

@InputType()
export class JobProfileUncheckedUpdateManyWithoutScopeNestedInput {
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
  set?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>>;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>>;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>>;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>>;

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
