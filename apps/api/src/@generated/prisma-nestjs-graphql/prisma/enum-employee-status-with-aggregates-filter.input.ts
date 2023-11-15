import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeStatus } from './employee-status.enum';
import { IntFilter } from './int-filter.input';
import { EnumEmployeeStatusFilter } from './enum-employee-status-filter.input';

@InputType()
export class EnumEmployeeStatusWithAggregatesFilter {
  @Field(() => EmployeeStatus, { nullable: true })
  equals?: keyof typeof EmployeeStatus;

  @Field(() => [EmployeeStatus], { nullable: true })
  in?: Array<keyof typeof EmployeeStatus>;

  @Field(() => [EmployeeStatus], { nullable: true })
  notIn?: Array<keyof typeof EmployeeStatus>;

  @Field(() => EnumEmployeeStatusWithAggregatesFilter, { nullable: true })
  not?: EnumEmployeeStatusWithAggregatesFilter;

  @Field(() => IntFilter, { nullable: true })
  _count?: IntFilter;

  @Field(() => EnumEmployeeStatusFilter, { nullable: true })
  _min?: EnumEmployeeStatusFilter;

  @Field(() => EnumEmployeeStatusFilter, { nullable: true })
  _max?: EnumEmployeeStatusFilter;
}
