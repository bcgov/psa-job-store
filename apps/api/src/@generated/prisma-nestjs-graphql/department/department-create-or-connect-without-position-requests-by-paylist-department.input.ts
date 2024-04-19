import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { DepartmentCreateWithoutPositionRequestsByPaylistDepartmentInput } from './department-create-without-position-requests-by-paylist-department.input';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';

@InputType()
export class DepartmentCreateOrConnectWithoutPositionRequestsByPaylistDepartmentInput {
  @Field(() => DepartmentWhereUniqueInput, { nullable: false })
  @Type(() => DepartmentWhereUniqueInput)
  where!: Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>;

  @Field(() => DepartmentCreateWithoutPositionRequestsByPaylistDepartmentInput, { nullable: false })
  @Type(() => DepartmentCreateWithoutPositionRequestsByPaylistDepartmentInput)
  create!: DepartmentCreateWithoutPositionRequestsByPaylistDepartmentInput;
}
