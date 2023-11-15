import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentWhereInput } from './department-where.input';
import { Type } from 'class-transformer';
import { DepartmentUpdateWithoutPositionInput } from './department-update-without-position.input';

@InputType()
export class DepartmentUpdateToOneWithWhereWithoutPositionInput {
  @Field(() => DepartmentWhereInput, { nullable: true })
  @Type(() => DepartmentWhereInput)
  where?: DepartmentWhereInput;

  @Field(() => DepartmentUpdateWithoutPositionInput, { nullable: false })
  @Type(() => DepartmentUpdateWithoutPositionInput)
  data!: DepartmentUpdateWithoutPositionInput;
}
