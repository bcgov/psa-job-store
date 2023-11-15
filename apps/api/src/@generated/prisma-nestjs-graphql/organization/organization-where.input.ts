import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { DepartmentListRelationFilter } from '../department/department-list-relation-filter.input';
import { PositionListRelationFilter } from '../position/position-list-relation-filter.input';
import { EmployeeListRelationFilter } from '../employee/employee-list-relation-filter.input';

@InputType()
export class OrganizationWhereInput {
  @Field(() => [OrganizationWhereInput], { nullable: true })
  AND?: Array<OrganizationWhereInput>;

  @Field(() => [OrganizationWhereInput], { nullable: true })
  OR?: Array<OrganizationWhereInput>;

  @Field(() => [OrganizationWhereInput], { nullable: true })
  NOT?: Array<OrganizationWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => DepartmentListRelationFilter, { nullable: true })
  departments?: DepartmentListRelationFilter;

  @Field(() => PositionListRelationFilter, { nullable: true })
  positions?: PositionListRelationFilter;

  @Field(() => EmployeeListRelationFilter, { nullable: true })
  employees?: EmployeeListRelationFilter;
}
