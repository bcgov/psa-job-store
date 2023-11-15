import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { EnumEmployeeStatusFilter } from '../prisma/enum-employee-status-filter.input';
import { ClassificationRelationFilter } from '../classification/classification-relation-filter.input';
import { DepartmentRelationFilter } from '../department/department-relation-filter.input';
import { OrganizationRelationFilter } from '../organization/organization-relation-filter.input';
import { PositionEmployeeListRelationFilter } from '../position-employee/position-employee-list-relation-filter.input';

@InputType()
export class EmployeeWhereInput {
  @Field(() => [EmployeeWhereInput], { nullable: true })
  AND?: Array<EmployeeWhereInput>;

  @Field(() => [EmployeeWhereInput], { nullable: true })
  OR?: Array<EmployeeWhereInput>;

  @Field(() => [EmployeeWhereInput], { nullable: true })
  NOT?: Array<EmployeeWhereInput>;

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

  @Field(() => ClassificationRelationFilter, { nullable: true })
  classification?: ClassificationRelationFilter;

  @Field(() => DepartmentRelationFilter, { nullable: true })
  department?: DepartmentRelationFilter;

  @Field(() => OrganizationRelationFilter, { nullable: true })
  organization?: OrganizationRelationFilter;

  @Field(() => PositionEmployeeListRelationFilter, { nullable: true })
  PositionEmployee?: PositionEmployeeListRelationFilter;
}
