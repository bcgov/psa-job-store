import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { PositionRequestCreateWithoutDepartmentInput } from './position-request-create-without-department.input';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';

@InputType()
export class PositionRequestCreateOrConnectWithoutDepartmentInput {
  @Field(() => PositionRequestWhereUniqueInput, { nullable: false })
  @Type(() => PositionRequestWhereUniqueInput)
  where!: Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id' | 'crm_id'>;

  @Field(() => PositionRequestCreateWithoutDepartmentInput, { nullable: false })
  @Type(() => PositionRequestCreateWithoutDepartmentInput)
  create!: PositionRequestCreateWithoutDepartmentInput;
}
