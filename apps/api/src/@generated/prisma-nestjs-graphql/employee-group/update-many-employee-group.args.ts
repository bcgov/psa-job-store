import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { EmployeeGroupUpdateManyMutationInput } from './employee-group-update-many-mutation.input';
import { EmployeeGroupWhereInput } from './employee-group-where.input';

@ArgsType()
export class UpdateManyEmployeeGroupArgs {
  @Field(() => EmployeeGroupUpdateManyMutationInput, { nullable: false })
  @Type(() => EmployeeGroupUpdateManyMutationInput)
  data!: EmployeeGroupUpdateManyMutationInput;

  @Field(() => EmployeeGroupWhereInput, { nullable: true })
  @Type(() => EmployeeGroupWhereInput)
  where?: EmployeeGroupWhereInput;
}
