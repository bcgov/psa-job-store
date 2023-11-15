import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionCreateWithoutDepartmentInput } from './position-create-without-department.input';
import { Type } from 'class-transformer';
import { PositionCreateOrConnectWithoutDepartmentInput } from './position-create-or-connect-without-department.input';
import { PositionCreateManyDepartmentInputEnvelope } from './position-create-many-department-input-envelope.input';
import { Prisma } from '@prisma/client';
import { PositionWhereUniqueInput } from './position-where-unique.input';

@InputType()
export class PositionUncheckedCreateNestedManyWithoutDepartmentInput {
  @Field(() => [PositionCreateWithoutDepartmentInput], { nullable: true })
  @Type(() => PositionCreateWithoutDepartmentInput)
  create?: Array<PositionCreateWithoutDepartmentInput>;

  @Field(() => [PositionCreateOrConnectWithoutDepartmentInput], { nullable: true })
  @Type(() => PositionCreateOrConnectWithoutDepartmentInput)
  connectOrCreate?: Array<PositionCreateOrConnectWithoutDepartmentInput>;

  @Field(() => PositionCreateManyDepartmentInputEnvelope, { nullable: true })
  @Type(() => PositionCreateManyDepartmentInputEnvelope)
  createMany?: PositionCreateManyDepartmentInputEnvelope;

  @Field(() => [PositionWhereUniqueInput], { nullable: true })
  @Type(() => PositionWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<PositionWhereUniqueInput, 'id'>>;
}
