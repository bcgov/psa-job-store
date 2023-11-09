import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutFamilyInput } from './job-profile-update-without-family.input';
import { JobProfileCreateWithoutFamilyInput } from './job-profile-create-without-family.input';

@InputType()
export class JobProfileUpsertWithWhereUniqueWithoutFamilyInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileUpdateWithoutFamilyInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutFamilyInput)
  update!: JobProfileUpdateWithoutFamilyInput;

  @Field(() => JobProfileCreateWithoutFamilyInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutFamilyInput)
  create!: JobProfileCreateWithoutFamilyInput;
}
