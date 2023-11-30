import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { OrganizationRelationFilter } from '../organization/organization-relation-filter.input';
import { PositionListRelationFilter } from '../position/position-list-relation-filter.input';
import { EmployeeListRelationFilter } from '../employee/employee-list-relation-filter.input';

@InputType()
export class DepartmentWhereInput {
  @Field(() => [DepartmentWhereInput], { nullable: true })
  AND?: Array<DepartmentWhereInput>;

  @Field(() => [DepartmentWhereInput], { nullable: true })
  OR?: Array<DepartmentWhereInput>;

  @Field(() => [DepartmentWhereInput], { nullable: true })
  NOT?: Array<DepartmentWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  organization_id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => OrganizationRelationFilter, { nullable: true })
  organization?: OrganizationRelationFilter;

  @Field(() => PositionListRelationFilter, { nullable: true })
  positions?: PositionListRelationFilter;

  @Field(() => EmployeeListRelationFilter, { nullable: true })
  employees?: EmployeeListRelationFilter;
}
