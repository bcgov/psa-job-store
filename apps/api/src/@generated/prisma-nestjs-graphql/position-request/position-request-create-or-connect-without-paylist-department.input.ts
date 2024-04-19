import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { PositionRequestCreateWithoutPaylist_departmentInput } from './position-request-create-without-paylist-department.input';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';

@InputType()
export class PositionRequestCreateOrConnectWithoutPaylist_departmentInput {
  @Field(() => PositionRequestWhereUniqueInput, { nullable: false })
  @Type(() => PositionRequestWhereUniqueInput)
  where!: Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id' | 'crm_id'>;

  @Field(() => PositionRequestCreateWithoutPaylist_departmentInput, { nullable: false })
  @Type(() => PositionRequestCreateWithoutPaylist_departmentInput)
  create!: PositionRequestCreateWithoutPaylist_departmentInput;
}
