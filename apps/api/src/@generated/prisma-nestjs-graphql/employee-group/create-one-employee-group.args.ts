import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { EmployeeGroupCreateInput } from './employee-group-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneEmployeeGroupArgs {
  @Field(() => EmployeeGroupCreateInput, { nullable: false })
  @Type(() => EmployeeGroupCreateInput)
  data!: EmployeeGroupCreateInput;
}
