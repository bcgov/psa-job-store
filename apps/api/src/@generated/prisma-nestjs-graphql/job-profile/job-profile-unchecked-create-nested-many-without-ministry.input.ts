import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutMinistryInput } from './job-profile-create-without-ministry.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutMinistryInput } from './job-profile-create-or-connect-without-ministry.input';
import { JobProfileCreateManyMinistryInputEnvelope } from './job-profile-create-many-ministry-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileUncheckedCreateNestedManyWithoutMinistryInput {
  @Field(() => [JobProfileCreateWithoutMinistryInput], { nullable: true })
  @Type(() => JobProfileCreateWithoutMinistryInput)
  create?: Array<JobProfileCreateWithoutMinistryInput>;

  @Field(() => [JobProfileCreateOrConnectWithoutMinistryInput], { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutMinistryInput)
  connectOrCreate?: Array<JobProfileCreateOrConnectWithoutMinistryInput>;

  @Field(() => JobProfileCreateManyMinistryInputEnvelope, { nullable: true })
  @Type(() => JobProfileCreateManyMinistryInputEnvelope)
  createMany?: JobProfileCreateManyMinistryInputEnvelope;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>>;
}
