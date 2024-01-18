import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutScopeInput } from './job-profile-create-without-scope.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutScopeInput } from './job-profile-create-or-connect-without-scope.input';
import { JobProfileCreateManyScopeInputEnvelope } from './job-profile-create-many-scope-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileUncheckedCreateNestedManyWithoutScopeInput {
  @Field(() => [JobProfileCreateWithoutScopeInput], { nullable: true })
  @Type(() => JobProfileCreateWithoutScopeInput)
  create?: Array<JobProfileCreateWithoutScopeInput>;

  @Field(() => [JobProfileCreateOrConnectWithoutScopeInput], { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutScopeInput)
  connectOrCreate?: Array<JobProfileCreateOrConnectWithoutScopeInput>;

  @Field(() => JobProfileCreateManyScopeInputEnvelope, { nullable: true })
  @Type(() => JobProfileCreateManyScopeInputEnvelope)
  createMany?: JobProfileCreateManyScopeInputEnvelope;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>>;
}
