import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { ClassificationRelationFilter } from '../classification/classification-relation-filter.input';
import { DepartmentRelationFilter } from '../department/department-relation-filter.input';
import { OrganizationRelationFilter } from '../organization/organization-relation-filter.input';
import { PositionEmployeeListRelationFilter } from '../position-employee/position-employee-list-relation-filter.input';

@InputType()
export class PositionWhereInput {
  @Field(() => [PositionWhereInput], { nullable: true })
  AND?: Array<PositionWhereInput>;

  @Field(() => [PositionWhereInput], { nullable: true })
  OR?: Array<PositionWhereInput>;

  @Field(() => [PositionWhereInput], { nullable: true })
  NOT?: Array<PositionWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  classification_id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  department_id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  organization_id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  supervisor_id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  title?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  number?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  job_profile_number?: StringFilter;

  @Field(() => BoolFilter, { nullable: true })
  is_empty?: BoolFilter;

  @Field(() => BoolFilter, { nullable: true })
  is_vacant?: BoolFilter;

  @Field(() => ClassificationRelationFilter, { nullable: true })
  classification?: ClassificationRelationFilter;

  @Field(() => DepartmentRelationFilter, { nullable: true })
  department?: DepartmentRelationFilter;

  @Field(() => OrganizationRelationFilter, { nullable: true })
  organization?: OrganizationRelationFilter;

  @Field(() => PositionEmployeeListRelationFilter, { nullable: true })
  employees?: PositionEmployeeListRelationFilter;
}
