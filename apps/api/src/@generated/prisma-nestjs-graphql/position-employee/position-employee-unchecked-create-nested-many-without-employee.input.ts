import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionEmployeeCreateWithoutEmployeeInput } from './position-employee-create-without-employee.input';
import { Type } from 'class-transformer';
import { PositionEmployeeCreateOrConnectWithoutEmployeeInput } from './position-employee-create-or-connect-without-employee.input';
import { PositionEmployeeCreateManyEmployeeInputEnvelope } from './position-employee-create-many-employee-input-envelope.input';
import { Prisma } from '@prisma/client';
import { PositionEmployeeWhereUniqueInput } from './position-employee-where-unique.input';

@InputType()
export class PositionEmployeeUncheckedCreateNestedManyWithoutEmployeeInput {
  @Field(() => [PositionEmployeeCreateWithoutEmployeeInput], { nullable: true })
  @Type(() => PositionEmployeeCreateWithoutEmployeeInput)
  create?: Array<PositionEmployeeCreateWithoutEmployeeInput>;

  @Field(() => [PositionEmployeeCreateOrConnectWithoutEmployeeInput], { nullable: true })
  @Type(() => PositionEmployeeCreateOrConnectWithoutEmployeeInput)
  connectOrCreate?: Array<PositionEmployeeCreateOrConnectWithoutEmployeeInput>;

  @Field(() => PositionEmployeeCreateManyEmployeeInputEnvelope, { nullable: true })
  @Type(() => PositionEmployeeCreateManyEmployeeInputEnvelope)
  createMany?: PositionEmployeeCreateManyEmployeeInputEnvelope;

  @Field(() => [PositionEmployeeWhereUniqueInput], { nullable: true })
  @Type(() => PositionEmployeeWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<PositionEmployeeWhereUniqueInput, 'employee_id_position_id'>>;
}
