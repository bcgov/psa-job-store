import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';
import { Type } from 'class-transformer';
import { PositionRequestUpdateWithoutPaylist_departmentInput } from './position-request-update-without-paylist-department.input';
import { PositionRequestCreateWithoutPaylist_departmentInput } from './position-request-create-without-paylist-department.input';

@InputType()
export class PositionRequestUpsertWithWhereUniqueWithoutPaylist_departmentInput {
  @Field(() => PositionRequestWhereUniqueInput, { nullable: false })
  @Type(() => PositionRequestWhereUniqueInput)
  where!: Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id' | 'crm_id'>;

  @Field(() => PositionRequestUpdateWithoutPaylist_departmentInput, { nullable: false })
  @Type(() => PositionRequestUpdateWithoutPaylist_departmentInput)
  update!: PositionRequestUpdateWithoutPaylist_departmentInput;

  @Field(() => PositionRequestCreateWithoutPaylist_departmentInput, { nullable: false })
  @Type(() => PositionRequestCreateWithoutPaylist_departmentInput)
  create!: PositionRequestCreateWithoutPaylist_departmentInput;
}
