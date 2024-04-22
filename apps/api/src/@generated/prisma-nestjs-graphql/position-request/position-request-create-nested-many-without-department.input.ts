import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { PositionRequestCreateManyDepartmentInputEnvelope } from './position-request-create-many-department-input-envelope.input';
import { PositionRequestCreateOrConnectWithoutDepartmentInput } from './position-request-create-or-connect-without-department.input';
import { PositionRequestCreateWithoutDepartmentInput } from './position-request-create-without-department.input';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';

@InputType()
export class PositionRequestCreateNestedManyWithoutDepartmentInput {
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
  connect?: Array<Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id' | 'crm_id'>>;
}
