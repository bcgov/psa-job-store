import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DepartmentCreateInput } from './department-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneDepartmentArgs {
  @Field(() => DepartmentCreateInput, { nullable: false })
  @Type(() => DepartmentCreateInput)
  data!: DepartmentCreateInput;
}
