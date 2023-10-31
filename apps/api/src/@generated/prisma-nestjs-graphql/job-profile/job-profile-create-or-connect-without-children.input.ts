import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutChildrenInput } from './job-profile-create-without-children.input';

@InputType()
export class JobProfileCreateOrConnectWithoutChildrenInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileCreateWithoutChildrenInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutChildrenInput)
  create!: JobProfileCreateWithoutChildrenInput;
}
