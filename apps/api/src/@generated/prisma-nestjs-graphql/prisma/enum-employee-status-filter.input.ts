import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeStatus } from './employee-status.enum';

@InputType()
export class EnumEmployeeStatusFilter {
  @Field(() => EmployeeStatus, { nullable: true })
  equals?: keyof typeof EmployeeStatus;

  @Field(() => [EmployeeStatus], { nullable: true })
  in?: Array<keyof typeof EmployeeStatus>;

  @Field(() => [EmployeeStatus], { nullable: true })
  notIn?: Array<keyof typeof EmployeeStatus>;

  @Field(() => EnumEmployeeStatusFilter, { nullable: true })
  not?: EnumEmployeeStatusFilter;
}
