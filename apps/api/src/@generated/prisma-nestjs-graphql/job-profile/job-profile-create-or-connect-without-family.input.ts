import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutFamilyInput } from './job-profile-create-without-family.input';

@InputType()
export class JobProfileCreateOrConnectWithoutFamilyInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileCreateWithoutFamilyInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutFamilyInput)
  create!: JobProfileCreateWithoutFamilyInput;
}
