import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutOwnerInput } from './job-profile-create-without-owner.input';
import { JobProfileUpdateWithoutOwnerInput } from './job-profile-update-without-owner.input';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileUpsertWithWhereUniqueWithoutOwnerInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>;

  @Field(() => JobProfileUpdateWithoutOwnerInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutOwnerInput)
  update!: JobProfileUpdateWithoutOwnerInput;

  @Field(() => JobProfileCreateWithoutOwnerInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutOwnerInput)
  create!: JobProfileCreateWithoutOwnerInput;
}
