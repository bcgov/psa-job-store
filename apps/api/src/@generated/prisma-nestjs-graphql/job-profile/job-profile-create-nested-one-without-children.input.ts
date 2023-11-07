import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutChildrenInput } from './job-profile-create-without-children.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutChildrenInput } from './job-profile-create-or-connect-without-children.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileCreateNestedOneWithoutChildrenInput {
  @Field(() => JobProfileCreateWithoutChildrenInput, { nullable: true })
  @Type(() => JobProfileCreateWithoutChildrenInput)
  create?: JobProfileCreateWithoutChildrenInput;

  @Field(() => JobProfileCreateOrConnectWithoutChildrenInput, { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutChildrenInput)
  connectOrCreate?: JobProfileCreateOrConnectWithoutChildrenInput;

  @Field(() => JobProfileWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;
}
