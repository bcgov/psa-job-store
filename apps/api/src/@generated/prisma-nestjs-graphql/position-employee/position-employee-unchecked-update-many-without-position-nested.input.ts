import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionEmployeeCreateWithoutPositionInput } from './position-employee-create-without-position.input';
import { Type } from 'class-transformer';
import { PositionEmployeeCreateOrConnectWithoutPositionInput } from './position-employee-create-or-connect-without-position.input';
import { PositionEmployeeUpsertWithWhereUniqueWithoutPositionInput } from './position-employee-upsert-with-where-unique-without-position.input';
import { PositionEmployeeCreateManyPositionInputEnvelope } from './position-employee-create-many-position-input-envelope.input';
import { Prisma } from '@prisma/client';
import { PositionEmployeeWhereUniqueInput } from './position-employee-where-unique.input';
import { PositionEmployeeUpdateWithWhereUniqueWithoutPositionInput } from './position-employee-update-with-where-unique-without-position.input';
import { PositionEmployeeUpdateManyWithWhereWithoutPositionInput } from './position-employee-update-many-with-where-without-position.input';
import { PositionEmployeeScalarWhereInput } from './position-employee-scalar-where.input';

@InputType()
export class PositionEmployeeUncheckedUpdateManyWithoutPositionNestedInput {
  @Field(() => [PositionEmployeeCreateWithoutPositionInput], { nullable: true })
  @Type(() => PositionEmployeeCreateWithoutPositionInput)
  create?: Array<PositionEmployeeCreateWithoutPositionInput>;

  @Field(() => [PositionEmployeeCreateOrConnectWithoutPositionInput], { nullable: true })
  @Type(() => PositionEmployeeCreateOrConnectWithoutPositionInput)
  connectOrCreate?: Array<PositionEmployeeCreateOrConnectWithoutPositionInput>;

  @Field(() => [PositionEmployeeUpsertWithWhereUniqueWithoutPositionInput], { nullable: true })
  @Type(() => PositionEmployeeUpsertWithWhereUniqueWithoutPositionInput)
  upsert?: Array<PositionEmployeeUpsertWithWhereUniqueWithoutPositionInput>;

  @Field(() => PositionEmployeeCreateManyPositionInputEnvelope, { nullable: true })
  @Type(() => PositionEmployeeCreateManyPositionInputEnvelope)
  createMany?: PositionEmployeeCreateManyPositionInputEnvelope;

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

  @Field(() => [PositionEmployeeUpdateWithWhereUniqueWithoutPositionInput], { nullable: true })
  @Type(() => PositionEmployeeUpdateWithWhereUniqueWithoutPositionInput)
  update?: Array<PositionEmployeeUpdateWithWhereUniqueWithoutPositionInput>;

  @Field(() => [PositionEmployeeUpdateManyWithWhereWithoutPositionInput], { nullable: true })
  @Type(() => PositionEmployeeUpdateManyWithWhereWithoutPositionInput)
  updateMany?: Array<PositionEmployeeUpdateManyWithWhereWithoutPositionInput>;

  @Field(() => [PositionEmployeeScalarWhereInput], { nullable: true })
  @Type(() => PositionEmployeeScalarWhereInput)
  deleteMany?: Array<PositionEmployeeScalarWhereInput>;
}
