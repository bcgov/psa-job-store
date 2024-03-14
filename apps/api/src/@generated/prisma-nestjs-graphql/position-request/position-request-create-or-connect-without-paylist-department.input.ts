import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';
import { Type } from 'class-transformer';
import { PositionRequestCreateWithoutPaylist_departmentInput } from './position-request-create-without-paylist-department.input';

@InputType()
export class PositionRequestCreateOrConnectWithoutPaylist_departmentInput {
  @Field(() => PositionRequestWhereUniqueInput, { nullable: false })
  @Type(() => PositionRequestWhereUniqueInput)
  where!: Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id' | 'crm_id'>;

  @Field(() => PositionRequestCreateWithoutPaylist_departmentInput, { nullable: false })
  @Type(() => PositionRequestCreateWithoutPaylist_departmentInput)
  create!: PositionRequestCreateWithoutPaylist_departmentInput;
}
