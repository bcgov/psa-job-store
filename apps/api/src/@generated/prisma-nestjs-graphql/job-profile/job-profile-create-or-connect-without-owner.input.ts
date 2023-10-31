import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutOwnerInput } from './job-profile-create-without-owner.input';

@InputType()
export class JobProfileCreateOrConnectWithoutOwnerInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileCreateWithoutOwnerInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutOwnerInput)
  create!: JobProfileCreateWithoutOwnerInput;
}
