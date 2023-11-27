import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { EnumEmployeeStatusFilter } from '../prisma/enum-employee-status-filter.input';

@InputType()
export class EmployeeScalarWhereInput {
  @Field(() => [EmployeeScalarWhereInput], { nullable: true })
  AND?: Array<EmployeeScalarWhereInput>;

  @Field(() => [EmployeeScalarWhereInput], { nullable: true })
  OR?: Array<EmployeeScalarWhereInput>;

  @Field(() => [EmployeeScalarWhereInput], { nullable: true })
  NOT?: Array<EmployeeScalarWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  classification_id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  department_id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  organization_id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => EnumEmployeeStatusFilter, { nullable: true })
  status?: EnumEmployeeStatusFilter;
}
