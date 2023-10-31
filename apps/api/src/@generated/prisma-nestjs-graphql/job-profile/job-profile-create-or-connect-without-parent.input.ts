import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutParentInput } from './job-profile-create-without-parent.input';

@InputType()
export class JobProfileCreateOrConnectWithoutParentInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileCreateWithoutParentInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutParentInput)
  create!: JobProfileCreateWithoutParentInput;
}
