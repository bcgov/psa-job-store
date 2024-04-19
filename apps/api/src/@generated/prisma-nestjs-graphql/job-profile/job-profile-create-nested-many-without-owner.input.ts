import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileCreateManyOwnerInputEnvelope } from './job-profile-create-many-owner-input-envelope.input';
import { JobProfileCreateOrConnectWithoutOwnerInput } from './job-profile-create-or-connect-without-owner.input';
import { JobProfileCreateWithoutOwnerInput } from './job-profile-create-without-owner.input';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileCreateNestedManyWithoutOwnerInput {
  @Field(() => [JobProfileCreateWithoutOwnerInput], { nullable: true })
  @Type(() => JobProfileCreateWithoutOwnerInput)
  create?: Array<JobProfileCreateWithoutOwnerInput>;

  @Field(() => [JobProfileCreateOrConnectWithoutOwnerInput], { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutOwnerInput)
  connectOrCreate?: Array<JobProfileCreateOrConnectWithoutOwnerInput>;

  @Field(() => JobProfileCreateManyOwnerInputEnvelope, { nullable: true })
  @Type(() => JobProfileCreateManyOwnerInputEnvelope)
  createMany?: JobProfileCreateManyOwnerInputEnvelope;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>>;
}
