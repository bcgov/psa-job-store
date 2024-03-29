import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutRole_typeInput } from './job-profile-create-without-role-type.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutRole_typeInput } from './job-profile-create-or-connect-without-role-type.input';
import { JobProfileCreateManyRole_typeInputEnvelope } from './job-profile-create-many-role-type-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileUncheckedCreateNestedManyWithoutRole_typeInput {
  @Field(() => [JobProfileCreateWithoutRole_typeInput], { nullable: true })
  @Type(() => JobProfileCreateWithoutRole_typeInput)
  create?: Array<JobProfileCreateWithoutRole_typeInput>;

  @Field(() => [JobProfileCreateOrConnectWithoutRole_typeInput], { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutRole_typeInput)
  connectOrCreate?: Array<JobProfileCreateOrConnectWithoutRole_typeInput>;

  @Field(() => JobProfileCreateManyRole_typeInputEnvelope, { nullable: true })
  @Type(() => JobProfileCreateManyRole_typeInputEnvelope)
  createMany?: JobProfileCreateManyRole_typeInputEnvelope;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>>;
}
