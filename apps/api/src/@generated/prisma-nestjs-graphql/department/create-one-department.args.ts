import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { DepartmentCreateInput } from './department-create.input';

@ArgsType()
export class CreateOneDepartmentArgs {
  @Field(() => DepartmentCreateInput, { nullable: false })
  @Type(() => DepartmentCreateInput)
  data!: DepartmentCreateInput;
}
