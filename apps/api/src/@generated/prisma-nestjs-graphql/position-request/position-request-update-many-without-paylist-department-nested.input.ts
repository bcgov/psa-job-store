import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionRequestCreateWithoutPaylist_departmentInput } from './position-request-create-without-paylist-department.input';
import { Type } from 'class-transformer';
import { PositionRequestCreateOrConnectWithoutPaylist_departmentInput } from './position-request-create-or-connect-without-paylist-department.input';
import { PositionRequestUpsertWithWhereUniqueWithoutPaylist_departmentInput } from './position-request-upsert-with-where-unique-without-paylist-department.input';
import { PositionRequestCreateManyPaylist_departmentInputEnvelope } from './position-request-create-many-paylist-department-input-envelope.input';
import { Prisma } from '@prisma/client';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';
import { PositionRequestUpdateWithWhereUniqueWithoutPaylist_departmentInput } from './position-request-update-with-where-unique-without-paylist-department.input';
import { PositionRequestUpdateManyWithWhereWithoutPaylist_departmentInput } from './position-request-update-many-with-where-without-paylist-department.input';
import { PositionRequestScalarWhereInput } from './position-request-scalar-where.input';

@InputType()
export class PositionRequestUpdateManyWithoutPaylist_departmentNestedInput {
  @Field(() => [PositionRequestCreateWithoutPaylist_departmentInput], { nullable: true })
  @Type(() => PositionRequestCreateWithoutPaylist_departmentInput)
  create?: Array<PositionRequestCreateWithoutPaylist_departmentInput>;

  @Field(() => [PositionRequestCreateOrConnectWithoutPaylist_departmentInput], { nullable: true })
  @Type(() => PositionRequestCreateOrConnectWithoutPaylist_departmentInput)
  connectOrCreate?: Array<PositionRequestCreateOrConnectWithoutPaylist_departmentInput>;

  @Field(() => [PositionRequestUpsertWithWhereUniqueWithoutPaylist_departmentInput], { nullable: true })
  @Type(() => PositionRequestUpsertWithWhereUniqueWithoutPaylist_departmentInput)
  upsert?: Array<PositionRequestUpsertWithWhereUniqueWithoutPaylist_departmentInput>;

  @Field(() => PositionRequestCreateManyPaylist_departmentInputEnvelope, { nullable: true })
  @Type(() => PositionRequestCreateManyPaylist_departmentInputEnvelope)
  createMany?: PositionRequestCreateManyPaylist_departmentInputEnvelope;

  @Field(() => [PositionRequestWhereUniqueInput], { nullable: true })
  @Type(() => PositionRequestWhereUniqueInput)
  set?: Array<Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id'>>;

  @Field(() => [PositionRequestWhereUniqueInput], { nullable: true })
  @Type(() => PositionRequestWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id'>>;

  @Field(() => [PositionRequestWhereUniqueInput], { nullable: true })
  @Type(() => PositionRequestWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id'>>;

  @Field(() => [PositionRequestWhereUniqueInput], { nullable: true })
  @Type(() => PositionRequestWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id'>>;

  @Field(() => [PositionRequestUpdateWithWhereUniqueWithoutPaylist_departmentInput], { nullable: true })
  @Type(() => PositionRequestUpdateWithWhereUniqueWithoutPaylist_departmentInput)
  update?: Array<PositionRequestUpdateWithWhereUniqueWithoutPaylist_departmentInput>;

  @Field(() => [PositionRequestUpdateManyWithWhereWithoutPaylist_departmentInput], { nullable: true })
  @Type(() => PositionRequestUpdateManyWithWhereWithoutPaylist_departmentInput)
  updateMany?: Array<PositionRequestUpdateManyWithWhereWithoutPaylist_departmentInput>;

  @Field(() => [PositionRequestScalarWhereInput], { nullable: true })
  @Type(() => PositionRequestScalarWhereInput)
  deleteMany?: Array<PositionRequestScalarWhereInput>;
}
