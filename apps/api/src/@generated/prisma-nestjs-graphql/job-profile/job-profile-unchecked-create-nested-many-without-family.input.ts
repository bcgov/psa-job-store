import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutFamilyInput } from './job-profile-create-without-family.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutFamilyInput } from './job-profile-create-or-connect-without-family.input';
import { JobProfileCreateManyFamilyInputEnvelope } from './job-profile-create-many-family-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileUncheckedCreateNestedManyWithoutFamilyInput {
  @Field(() => [JobProfileCreateWithoutFamilyInput], { nullable: true })
  @Type(() => JobProfileCreateWithoutFamilyInput)
  create?: Array<JobProfileCreateWithoutFamilyInput>;

  @Field(() => [JobProfileCreateOrConnectWithoutFamilyInput], { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutFamilyInput)
  connectOrCreate?: Array<JobProfileCreateOrConnectWithoutFamilyInput>;

  @Field(() => JobProfileCreateManyFamilyInputEnvelope, { nullable: true })
  @Type(() => JobProfileCreateManyFamilyInputEnvelope)
  createMany?: JobProfileCreateManyFamilyInputEnvelope;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>>;
}
