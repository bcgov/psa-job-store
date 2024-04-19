import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { PositionRequestUpdateWithoutPaylist_departmentInput } from './position-request-update-without-paylist-department.input';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';

@InputType()
export class PositionRequestUpdateWithWhereUniqueWithoutPaylist_departmentInput {
  @Field(() => PositionRequestWhereUniqueInput, { nullable: false })
  @Type(() => PositionRequestWhereUniqueInput)
  where!: Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id' | 'crm_id'>;

  @Field(() => PositionRequestUpdateWithoutPaylist_departmentInput, { nullable: false })
  @Type(() => PositionRequestUpdateWithoutPaylist_departmentInput)
  data!: PositionRequestUpdateWithoutPaylist_departmentInput;
}
