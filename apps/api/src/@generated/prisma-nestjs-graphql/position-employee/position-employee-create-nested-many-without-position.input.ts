import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionEmployeeCreateWithoutPositionInput } from './position-employee-create-without-position.input';
import { Type } from 'class-transformer';
import { PositionEmployeeCreateOrConnectWithoutPositionInput } from './position-employee-create-or-connect-without-position.input';
import { PositionEmployeeCreateManyPositionInputEnvelope } from './position-employee-create-many-position-input-envelope.input';
import { Prisma } from '@prisma/client';
import { PositionEmployeeWhereUniqueInput } from './position-employee-where-unique.input';

@InputType()
export class PositionEmployeeCreateNestedManyWithoutPositionInput {
  @Field(() => [PositionEmployeeCreateWithoutPositionInput], { nullable: true })
  @Type(() => PositionEmployeeCreateWithoutPositionInput)
  create?: Array<PositionEmployeeCreateWithoutPositionInput>;

  @Field(() => [PositionEmployeeCreateOrConnectWithoutPositionInput], { nullable: true })
  @Type(() => PositionEmployeeCreateOrConnectWithoutPositionInput)
  connectOrCreate?: Array<PositionEmployeeCreateOrConnectWithoutPositionInput>;

  @Field(() => PositionEmployeeCreateManyPositionInputEnvelope, { nullable: true })
  @Type(() => PositionEmployeeCreateManyPositionInputEnvelope)
  createMany?: PositionEmployeeCreateManyPositionInputEnvelope;

  @Field(() => [PositionEmployeeWhereUniqueInput], { nullable: true })
  @Type(() => PositionEmployeeWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<PositionEmployeeWhereUniqueInput, 'employee_id_position_id'>>;
}
