import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionRequestCreateWithoutDepartmentInput } from './position-request-create-without-department.input';
import { Type } from 'class-transformer';
import { PositionRequestCreateOrConnectWithoutDepartmentInput } from './position-request-create-or-connect-without-department.input';
import { PositionRequestCreateManyDepartmentInputEnvelope } from './position-request-create-many-department-input-envelope.input';
import { Prisma } from '@prisma/client';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';

@InputType()
export class PositionRequestUncheckedCreateNestedManyWithoutDepartmentInput {
  @Field(() => [PositionRequestCreateWithoutDepartmentInput], { nullable: true })
  @Type(() => PositionRequestCreateWithoutDepartmentInput)
  create?: Array<PositionRequestCreateWithoutDepartmentInput>;

  @Field(() => [PositionRequestCreateOrConnectWithoutDepartmentInput], { nullable: true })
  @Type(() => PositionRequestCreateOrConnectWithoutDepartmentInput)
  connectOrCreate?: Array<PositionRequestCreateOrConnectWithoutDepartmentInput>;

  @Field(() => PositionRequestCreateManyDepartmentInputEnvelope, { nullable: true })
  @Type(() => PositionRequestCreateManyDepartmentInputEnvelope)
  createMany?: PositionRequestCreateManyDepartmentInputEnvelope;

  @Field(() => [PositionRequestWhereUniqueInput], { nullable: true })
  @Type(() => PositionRequestWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id'>>;
}
