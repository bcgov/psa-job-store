import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { PositionRequestCreateManyPaylist_departmentInputEnvelope } from './position-request-create-many-paylist-department-input-envelope.input';
import { PositionRequestCreateOrConnectWithoutPaylist_departmentInput } from './position-request-create-or-connect-without-paylist-department.input';
import { PositionRequestCreateWithoutPaylist_departmentInput } from './position-request-create-without-paylist-department.input';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';

@InputType()
export class PositionRequestUncheckedCreateNestedManyWithoutPaylist_departmentInput {
  @Field(() => [PositionRequestCreateWithoutPaylist_departmentInput], { nullable: true })
  @Type(() => PositionRequestCreateWithoutPaylist_departmentInput)
  create?: Array<PositionRequestCreateWithoutPaylist_departmentInput>;

  @Field(() => [PositionRequestCreateOrConnectWithoutPaylist_departmentInput], { nullable: true })
  @Type(() => PositionRequestCreateOrConnectWithoutPaylist_departmentInput)
  connectOrCreate?: Array<PositionRequestCreateOrConnectWithoutPaylist_departmentInput>;

  @Field(() => PositionRequestCreateManyPaylist_departmentInputEnvelope, { nullable: true })
  @Type(() => PositionRequestCreateManyPaylist_departmentInputEnvelope)
  createMany?: PositionRequestCreateManyPaylist_departmentInputEnvelope;

  @Field(() => [PositionRequestWhereUniqueInput], { nullable: true })
  @Type(() => PositionRequestWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id' | 'crm_id'>>;
}
