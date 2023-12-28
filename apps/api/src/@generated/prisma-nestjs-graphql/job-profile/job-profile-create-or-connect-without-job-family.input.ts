import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutJob_familyInput } from './job-profile-create-without-job-family.input';

@InputType()
export class JobProfileCreateOrConnectWithoutJob_familyInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileCreateWithoutJob_familyInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutJob_familyInput)
  create!: JobProfileCreateWithoutJob_familyInput;
}
