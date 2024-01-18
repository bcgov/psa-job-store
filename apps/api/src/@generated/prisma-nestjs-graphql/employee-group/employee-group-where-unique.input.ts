import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeGroupWhereInput } from './employee-group-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { ProfessionalDesignationListRelationFilter } from '../professional-designation/professional-designation-list-relation-filter.input';

@InputType()
export class EmployeeGroupWhereUniqueInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => [EmployeeGroupWhereInput], { nullable: true })
  AND?: Array<EmployeeGroupWhereInput>;

  @Field(() => [EmployeeGroupWhereInput], { nullable: true })
  OR?: Array<EmployeeGroupWhereInput>;

  @Field(() => [EmployeeGroupWhereInput], { nullable: true })
  NOT?: Array<EmployeeGroupWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => ProfessionalDesignationListRelationFilter, { nullable: true })
  professional_designations?: ProfessionalDesignationListRelationFilter;
}
