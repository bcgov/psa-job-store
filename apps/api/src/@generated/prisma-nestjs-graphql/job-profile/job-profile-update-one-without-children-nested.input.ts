import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutChildrenInput } from './job-profile-create-without-children.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutChildrenInput } from './job-profile-create-or-connect-without-children.input';
import { JobProfileUpsertWithoutChildrenInput } from './job-profile-upsert-without-children.input';
import { JobProfileWhereInput } from './job-profile-where.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { JobProfileUpdateToOneWithWhereWithoutChildrenInput } from './job-profile-update-to-one-with-where-without-children.input';

@InputType()
export class JobProfileUpdateOneWithoutChildrenNestedInput {
  @Field(() => JobProfileCreateWithoutChildrenInput, { nullable: true })
  @Type(() => JobProfileCreateWithoutChildrenInput)
  create?: JobProfileCreateWithoutChildrenInput;

  @Field(() => JobProfileCreateOrConnectWithoutChildrenInput, { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutChildrenInput)
  connectOrCreate?: JobProfileCreateOrConnectWithoutChildrenInput;

  @Field(() => JobProfileUpsertWithoutChildrenInput, { nullable: true })
  @Type(() => JobProfileUpsertWithoutChildrenInput)
  upsert?: JobProfileUpsertWithoutChildrenInput;

  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  disconnect?: JobProfileWhereInput;

  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  delete?: JobProfileWhereInput;

  @Field(() => JobProfileWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileUpdateToOneWithWhereWithoutChildrenInput, { nullable: true })
  @Type(() => JobProfileUpdateToOneWithWhereWithoutChildrenInput)
  update?: JobProfileUpdateToOneWithWhereWithoutChildrenInput;
}
