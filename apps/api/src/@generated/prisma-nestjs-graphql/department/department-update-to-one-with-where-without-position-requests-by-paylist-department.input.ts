import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { DepartmentUpdateWithoutPositionRequestsByPaylistDepartmentInput } from './department-update-without-position-requests-by-paylist-department.input';
import { DepartmentWhereInput } from './department-where.input';

@InputType()
export class DepartmentUpdateToOneWithWhereWithoutPositionRequestsByPaylistDepartmentInput {
  @Field(() => DepartmentWhereInput, { nullable: true })
  @Type(() => DepartmentWhereInput)
  where?: DepartmentWhereInput;

  @Field(() => DepartmentUpdateWithoutPositionRequestsByPaylistDepartmentInput, { nullable: false })
  @Type(() => DepartmentUpdateWithoutPositionRequestsByPaylistDepartmentInput)
  data!: DepartmentUpdateWithoutPositionRequestsByPaylistDepartmentInput;
}
