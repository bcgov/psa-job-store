import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { EmployeeGroupWhereInput } from './employee-group-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyEmployeeGroupArgs {
  @Field(() => EmployeeGroupWhereInput, { nullable: true })
  @Type(() => EmployeeGroupWhereInput)
  where?: EmployeeGroupWhereInput;
}
