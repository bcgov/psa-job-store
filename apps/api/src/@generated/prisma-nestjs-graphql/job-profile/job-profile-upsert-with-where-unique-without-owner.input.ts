import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutOwnerInput } from './job-profile-update-without-owner.input';
import { JobProfileCreateWithoutOwnerInput } from './job-profile-create-without-owner.input';

@InputType()
export class JobProfileUpsertWithWhereUniqueWithoutOwnerInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileUpdateWithoutOwnerInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutOwnerInput)
  update!: JobProfileUpdateWithoutOwnerInput;

  @Field(() => JobProfileCreateWithoutOwnerInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutOwnerInput)
  create!: JobProfileCreateWithoutOwnerInput;
}
