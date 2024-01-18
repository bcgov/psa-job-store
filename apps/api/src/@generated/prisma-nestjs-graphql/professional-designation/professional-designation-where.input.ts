import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { EmployeeGroupRelationFilter } from '../employee-group/employee-group-relation-filter.input';
import { JobProfileProfessionalDesignationListRelationFilter } from '../job-profile-professional-designation/job-profile-professional-designation-list-relation-filter.input';

@InputType()
export class ProfessionalDesignationWhereInput {
  @Field(() => [ProfessionalDesignationWhereInput], { nullable: true })
  AND?: Array<ProfessionalDesignationWhereInput>;

  @Field(() => [ProfessionalDesignationWhereInput], { nullable: true })
  OR?: Array<ProfessionalDesignationWhereInput>;

  @Field(() => [ProfessionalDesignationWhereInput], { nullable: true })
  NOT?: Array<ProfessionalDesignationWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  employee_group_id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => EmployeeGroupRelationFilter, { nullable: true })
  employee_group?: EmployeeGroupRelationFilter;

  @Field(() => JobProfileProfessionalDesignationListRelationFilter, { nullable: true })
  job_profiles?: JobProfileProfessionalDesignationListRelationFilter;
}
