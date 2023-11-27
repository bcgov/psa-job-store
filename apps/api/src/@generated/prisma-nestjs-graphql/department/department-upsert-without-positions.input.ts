import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentUpdateWithoutPositionsInput } from './department-update-without-positions.input';
import { Type } from 'class-transformer';
import { DepartmentCreateWithoutPositionsInput } from './department-create-without-positions.input';
import { DepartmentWhereInput } from './department-where.input';

@InputType()
export class DepartmentUpsertWithoutPositionsInput {
  @Field(() => DepartmentUpdateWithoutPositionsInput, { nullable: false })
  @Type(() => DepartmentUpdateWithoutPositionsInput)
  update!: DepartmentUpdateWithoutPositionsInput;

  @Field(() => DepartmentCreateWithoutPositionsInput, { nullable: false })
  @Type(() => DepartmentCreateWithoutPositionsInput)
  create!: DepartmentCreateWithoutPositionsInput;

  @Field(() => DepartmentWhereInput, { nullable: true })
  @Type(() => DepartmentWhereInput)
  where?: DepartmentWhereInput;
}
