import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { EmployeeGroupWhereInput } from './employee-group-where.input';

@ArgsType()
export class DeleteManyEmployeeGroupArgs {
  @Field(() => EmployeeGroupWhereInput, { nullable: true })
  @Type(() => EmployeeGroupWhereInput)
  where?: EmployeeGroupWhereInput;
}
