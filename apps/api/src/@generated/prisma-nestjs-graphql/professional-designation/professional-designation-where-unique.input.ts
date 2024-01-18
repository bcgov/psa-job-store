import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { ProfessionalDesignationWhereInput } from './professional-designation-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { EmployeeGroupRelationFilter } from '../employee-group/employee-group-relation-filter.input';
import { JobProfileProfessionalDesignationListRelationFilter } from '../job-profile-professional-designation/job-profile-professional-designation-list-relation-filter.input';

@InputType()
export class ProfessionalDesignationWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => [ProfessionalDesignationWhereInput], { nullable: true })
  AND?: Array<ProfessionalDesignationWhereInput>;

  @Field(() => [ProfessionalDesignationWhereInput], { nullable: true })
  OR?: Array<ProfessionalDesignationWhereInput>;

  @Field(() => [ProfessionalDesignationWhereInput], { nullable: true })
  NOT?: Array<ProfessionalDesignationWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  employee_group_id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => EmployeeGroupRelationFilter, { nullable: true })
  employee_group?: EmployeeGroupRelationFilter;

  @Field(() => JobProfileProfessionalDesignationListRelationFilter, { nullable: true })
  job_profiles?: JobProfileProfessionalDesignationListRelationFilter;
}
