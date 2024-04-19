import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { EmployeeGroupCreateInput } from './employee-group-create.input';

@ArgsType()
export class CreateOneEmployeeGroupArgs {
  @Field(() => EmployeeGroupCreateInput, { nullable: false })
  @Type(() => EmployeeGroupCreateInput)
  data!: EmployeeGroupCreateInput;
}
