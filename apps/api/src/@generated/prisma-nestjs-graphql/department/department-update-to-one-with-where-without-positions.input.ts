import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentWhereInput } from './department-where.input';
import { Type } from 'class-transformer';
import { DepartmentUpdateWithoutPositionsInput } from './department-update-without-positions.input';

@InputType()
export class DepartmentUpdateToOneWithWhereWithoutPositionsInput {
  @Field(() => DepartmentWhereInput, { nullable: true })
  @Type(() => DepartmentWhereInput)
  where?: DepartmentWhereInput;

  @Field(() => DepartmentUpdateWithoutPositionsInput, { nullable: false })
  @Type(() => DepartmentUpdateWithoutPositionsInput)
  data!: DepartmentUpdateWithoutPositionsInput;
}
