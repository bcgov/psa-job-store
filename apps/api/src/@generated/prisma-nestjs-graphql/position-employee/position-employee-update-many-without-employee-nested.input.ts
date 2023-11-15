import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionEmployeeCreateWithoutEmployeeInput } from './position-employee-create-without-employee.input';
import { Type } from 'class-transformer';
import { PositionEmployeeCreateOrConnectWithoutEmployeeInput } from './position-employee-create-or-connect-without-employee.input';
import { PositionEmployeeUpsertWithWhereUniqueWithoutEmployeeInput } from './position-employee-upsert-with-where-unique-without-employee.input';
import { PositionEmployeeCreateManyEmployeeInputEnvelope } from './position-employee-create-many-employee-input-envelope.input';
import { Prisma } from '@prisma/client';
import { PositionEmployeeWhereUniqueInput } from './position-employee-where-unique.input';
import { PositionEmployeeUpdateWithWhereUniqueWithoutEmployeeInput } from './position-employee-update-with-where-unique-without-employee.input';
import { PositionEmployeeUpdateManyWithWhereWithoutEmployeeInput } from './position-employee-update-many-with-where-without-employee.input';
import { PositionEmployeeScalarWhereInput } from './position-employee-scalar-where.input';

@InputType()
export class PositionEmployeeUpdateManyWithoutEmployeeNestedInput {
  @Field(() => [PositionEmployeeCreateWithoutEmployeeInput], { nullable: true })
  @Type(() => PositionEmployeeCreateWithoutEmployeeInput)
  create?: Array<PositionEmployeeCreateWithoutEmployeeInput>;

  @Field(() => [PositionEmployeeCreateOrConnectWithoutEmployeeInput], { nullable: true })
  @Type(() => PositionEmployeeCreateOrConnectWithoutEmployeeInput)
  connectOrCreate?: Array<PositionEmployeeCreateOrConnectWithoutEmployeeInput>;

  @Field(() => [PositionEmployeeUpsertWithWhereUniqueWithoutEmployeeInput], { nullable: true })
  @Type(() => PositionEmployeeUpsertWithWhereUniqueWithoutEmployeeInput)
  upsert?: Array<PositionEmployeeUpsertWithWhereUniqueWithoutEmployeeInput>;

  @Field(() => PositionEmployeeCreateManyEmployeeInputEnvelope, { nullable: true })
  @Type(() => PositionEmployeeCreateManyEmployeeInputEnvelope)
  createMany?: PositionEmployeeCreateManyEmployeeInputEnvelope;

  @Field(() => [PositionEmployeeWhereUniqueInput], { nullable: true })
  @Type(() => PositionEmployeeWhereUniqueInput)
  set?: Array<Prisma.AtLeast<PositionEmployeeWhereUniqueInput, 'employee_id_position_id'>>;

  @Field(() => [PositionEmployeeWhereUniqueInput], { nullable: true })
  @Type(() => PositionEmployeeWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<PositionEmployeeWhereUniqueInput, 'employee_id_position_id'>>;

  @Field(() => [PositionEmployeeWhereUniqueInput], { nullable: true })
  @Type(() => PositionEmployeeWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<PositionEmployeeWhereUniqueInput, 'employee_id_position_id'>>;

  @Field(() => [PositionEmployeeWhereUniqueInput], { nullable: true })
  @Type(() => PositionEmployeeWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<PositionEmployeeWhereUniqueInput, 'employee_id_position_id'>>;

  @Field(() => [PositionEmployeeUpdateWithWhereUniqueWithoutEmployeeInput], { nullable: true })
  @Type(() => PositionEmployeeUpdateWithWhereUniqueWithoutEmployeeInput)
  update?: Array<PositionEmployeeUpdateWithWhereUniqueWithoutEmployeeInput>;

  @Field(() => [PositionEmployeeUpdateManyWithWhereWithoutEmployeeInput], { nullable: true })
  @Type(() => PositionEmployeeUpdateManyWithWhereWithoutEmployeeInput)
  updateMany?: Array<PositionEmployeeUpdateManyWithWhereWithoutEmployeeInput>;

  @Field(() => [PositionEmployeeScalarWhereInput], { nullable: true })
  @Type(() => PositionEmployeeScalarWhereInput)
  deleteMany?: Array<PositionEmployeeScalarWhereInput>;
}
