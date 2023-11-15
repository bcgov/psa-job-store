import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionCreateWithoutDepartmentInput } from './position-create-without-department.input';
import { Type } from 'class-transformer';
import { PositionCreateOrConnectWithoutDepartmentInput } from './position-create-or-connect-without-department.input';
import { PositionUpsertWithWhereUniqueWithoutDepartmentInput } from './position-upsert-with-where-unique-without-department.input';
import { PositionCreateManyDepartmentInputEnvelope } from './position-create-many-department-input-envelope.input';
import { Prisma } from '@prisma/client';
import { PositionWhereUniqueInput } from './position-where-unique.input';
import { PositionUpdateWithWhereUniqueWithoutDepartmentInput } from './position-update-with-where-unique-without-department.input';
import { PositionUpdateManyWithWhereWithoutDepartmentInput } from './position-update-many-with-where-without-department.input';
import { PositionScalarWhereInput } from './position-scalar-where.input';

@InputType()
export class PositionUpdateManyWithoutDepartmentNestedInput {
  @Field(() => [PositionCreateWithoutDepartmentInput], { nullable: true })
  @Type(() => PositionCreateWithoutDepartmentInput)
  create?: Array<PositionCreateWithoutDepartmentInput>;

  @Field(() => [PositionCreateOrConnectWithoutDepartmentInput], { nullable: true })
  @Type(() => PositionCreateOrConnectWithoutDepartmentInput)
  connectOrCreate?: Array<PositionCreateOrConnectWithoutDepartmentInput>;

  @Field(() => [PositionUpsertWithWhereUniqueWithoutDepartmentInput], { nullable: true })
  @Type(() => PositionUpsertWithWhereUniqueWithoutDepartmentInput)
  upsert?: Array<PositionUpsertWithWhereUniqueWithoutDepartmentInput>;

  @Field(() => PositionCreateManyDepartmentInputEnvelope, { nullable: true })
  @Type(() => PositionCreateManyDepartmentInputEnvelope)
  createMany?: PositionCreateManyDepartmentInputEnvelope;

  @Field(() => [PositionWhereUniqueInput], { nullable: true })
  @Type(() => PositionWhereUniqueInput)
  set?: Array<Prisma.AtLeast<PositionWhereUniqueInput, 'id'>>;

  @Field(() => [PositionWhereUniqueInput], { nullable: true })
  @Type(() => PositionWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<PositionWhereUniqueInput, 'id'>>;

  @Field(() => [PositionWhereUniqueInput], { nullable: true })
  @Type(() => PositionWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<PositionWhereUniqueInput, 'id'>>;

  @Field(() => [PositionWhereUniqueInput], { nullable: true })
  @Type(() => PositionWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<PositionWhereUniqueInput, 'id'>>;

  @Field(() => [PositionUpdateWithWhereUniqueWithoutDepartmentInput], { nullable: true })
  @Type(() => PositionUpdateWithWhereUniqueWithoutDepartmentInput)
  update?: Array<PositionUpdateWithWhereUniqueWithoutDepartmentInput>;

  @Field(() => [PositionUpdateManyWithWhereWithoutDepartmentInput], { nullable: true })
  @Type(() => PositionUpdateManyWithWhereWithoutDepartmentInput)
  updateMany?: Array<PositionUpdateManyWithWhereWithoutDepartmentInput>;

  @Field(() => [PositionScalarWhereInput], { nullable: true })
  @Type(() => PositionScalarWhereInput)
  deleteMany?: Array<PositionScalarWhereInput>;
}
