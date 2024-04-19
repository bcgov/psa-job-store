import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { DepartmentWhereInput } from './department-where.input';

@ArgsType()
export class DeleteManyDepartmentArgs {
  @Field(() => DepartmentWhereInput, { nullable: true })
  @Type(() => DepartmentWhereInput)
  where?: DepartmentWhereInput;
}
