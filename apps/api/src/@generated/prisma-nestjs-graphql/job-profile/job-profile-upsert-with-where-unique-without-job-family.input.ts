import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutJob_familyInput } from './job-profile-update-without-job-family.input';
import { JobProfileCreateWithoutJob_familyInput } from './job-profile-create-without-job-family.input';

@InputType()
export class JobProfileUpsertWithWhereUniqueWithoutJob_familyInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileUpdateWithoutJob_familyInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutJob_familyInput)
  update!: JobProfileUpdateWithoutJob_familyInput;

  @Field(() => JobProfileCreateWithoutJob_familyInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutJob_familyInput)
  create!: JobProfileCreateWithoutJob_familyInput;
}
