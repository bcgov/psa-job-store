import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentUpdateWithoutPositionInput } from './department-update-without-position.input';
import { Type } from 'class-transformer';
import { DepartmentCreateWithoutPositionInput } from './department-create-without-position.input';
import { DepartmentWhereInput } from './department-where.input';

@InputType()
export class DepartmentUpsertWithoutPositionInput {
  @Field(() => DepartmentUpdateWithoutPositionInput, { nullable: false })
  @Type(() => DepartmentUpdateWithoutPositionInput)
  update!: DepartmentUpdateWithoutPositionInput;

  @Field(() => DepartmentCreateWithoutPositionInput, { nullable: false })
  @Type(() => DepartmentCreateWithoutPositionInput)
  create!: DepartmentCreateWithoutPositionInput;

  @Field(() => DepartmentWhereInput, { nullable: true })
  @Type(() => DepartmentWhereInput)
  where?: DepartmentWhereInput;
}
