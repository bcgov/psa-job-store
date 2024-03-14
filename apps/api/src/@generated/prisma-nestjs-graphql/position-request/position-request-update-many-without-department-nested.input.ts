import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionRequestCreateWithoutDepartmentInput } from './position-request-create-without-department.input';
import { Type } from 'class-transformer';
import { PositionRequestCreateOrConnectWithoutDepartmentInput } from './position-request-create-or-connect-without-department.input';
import { PositionRequestUpsertWithWhereUniqueWithoutDepartmentInput } from './position-request-upsert-with-where-unique-without-department.input';
import { PositionRequestCreateManyDepartmentInputEnvelope } from './position-request-create-many-department-input-envelope.input';
import { Prisma } from '@prisma/client';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';
import { PositionRequestUpdateWithWhereUniqueWithoutDepartmentInput } from './position-request-update-with-where-unique-without-department.input';
import { PositionRequestUpdateManyWithWhereWithoutDepartmentInput } from './position-request-update-many-with-where-without-department.input';
import { PositionRequestScalarWhereInput } from './position-request-scalar-where.input';

@InputType()
export class PositionRequestUpdateManyWithoutDepartmentNestedInput {
  @Field(() => [PositionRequestCreateWithoutDepartmentInput], { nullable: true })
  @Type(() => PositionRequestCreateWithoutDepartmentInput)
  create?: Array<PositionRequestCreateWithoutDepartmentInput>;

  @Field(() => [PositionRequestCreateOrConnectWithoutDepartmentInput], { nullable: true })
  @Type(() => PositionRequestCreateOrConnectWithoutDepartmentInput)
  connectOrCreate?: Array<PositionRequestCreateOrConnectWithoutDepartmentInput>;

  @Field(() => [PositionRequestUpsertWithWhereUniqueWithoutDepartmentInput], { nullable: true })
  @Type(() => PositionRequestUpsertWithWhereUniqueWithoutDepartmentInput)
  upsert?: Array<PositionRequestUpsertWithWhereUniqueWithoutDepartmentInput>;

  @Field(() => PositionRequestCreateManyDepartmentInputEnvelope, { nullable: true })
  @Type(() => PositionRequestCreateManyDepartmentInputEnvelope)
  createMany?: PositionRequestCreateManyDepartmentInputEnvelope;

  @Field(() => [PositionRequestWhereUniqueInput], { nullable: true })
  @Type(() => PositionRequestWhereUniqueInput)
  set?: Array<Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id' | 'crm_id'>>;

  @Field(() => [PositionRequestWhereUniqueInput], { nullable: true })
  @Type(() => PositionRequestWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id' | 'crm_id'>>;

  @Field(() => [PositionRequestWhereUniqueInput], { nullable: true })
  @Type(() => PositionRequestWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id' | 'crm_id'>>;

  @Field(() => [PositionRequestWhereUniqueInput], { nullable: true })
  @Type(() => PositionRequestWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id' | 'crm_id'>>;

  @Field(() => [PositionRequestUpdateWithWhereUniqueWithoutDepartmentInput], { nullable: true })
  @Type(() => PositionRequestUpdateWithWhereUniqueWithoutDepartmentInput)
  update?: Array<PositionRequestUpdateWithWhereUniqueWithoutDepartmentInput>;

  @Field(() => [PositionRequestUpdateManyWithWhereWithoutDepartmentInput], { nullable: true })
  @Type(() => PositionRequestUpdateManyWithWhereWithoutDepartmentInput)
  updateMany?: Array<PositionRequestUpdateManyWithWhereWithoutDepartmentInput>;

  @Field(() => [PositionRequestScalarWhereInput], { nullable: true })
  @Type(() => PositionRequestScalarWhereInput)
  deleteMany?: Array<PositionRequestScalarWhereInput>;
}
