import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentUpdateWithoutPositionRequestsByPaylistDepartmentInput } from './department-update-without-position-requests-by-paylist-department.input';
import { Type } from 'class-transformer';
import { DepartmentCreateWithoutPositionRequestsByPaylistDepartmentInput } from './department-create-without-position-requests-by-paylist-department.input';
import { DepartmentWhereInput } from './department-where.input';

@InputType()
export class DepartmentUpsertWithoutPositionRequestsByPaylistDepartmentInput {
  @Field(() => DepartmentUpdateWithoutPositionRequestsByPaylistDepartmentInput, { nullable: false })
  @Type(() => DepartmentUpdateWithoutPositionRequestsByPaylistDepartmentInput)
  update!: DepartmentUpdateWithoutPositionRequestsByPaylistDepartmentInput;

  @Field(() => DepartmentCreateWithoutPositionRequestsByPaylistDepartmentInput, { nullable: false })
  @Type(() => DepartmentCreateWithoutPositionRequestsByPaylistDepartmentInput)
  create!: DepartmentCreateWithoutPositionRequestsByPaylistDepartmentInput;

  @Field(() => DepartmentWhereInput, { nullable: true })
  @Type(() => DepartmentWhereInput)
  where?: DepartmentWhereInput;
}
