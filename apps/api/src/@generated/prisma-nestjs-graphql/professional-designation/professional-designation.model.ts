import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { EmployeeGroup } from '../employee-group/employee-group.model';
import { JobProfileProfessionalDesignation } from '../job-profile-professional-designation/job-profile-professional-designation.model';

@ObjectType()
export class ProfessionalDesignation {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  employee_group_id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => EmployeeGroup, { nullable: false })
  employee_group?: EmployeeGroup;

  @Field(() => [JobProfileProfessionalDesignation], { nullable: true })
  job_profiles?: Array<JobProfileProfessionalDesignation>;
}
