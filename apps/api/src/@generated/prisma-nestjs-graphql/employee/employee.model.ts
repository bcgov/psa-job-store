import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { EmployeeStatus } from '../prisma/employee-status.enum';
import { Classification } from '../classification/classification.model';
import { Department } from '../department/department.model';
import { Organization } from '../organization/organization.model';
import { PositionEmployee } from '../position-employee/position-employee.model';

@ObjectType()
export class Employee {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  classification_id!: string;

  @Field(() => String, { nullable: false })
  department_id!: string;

  @Field(() => String, { nullable: false })
  organization_id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => EmployeeStatus, { nullable: true })
  status!: keyof typeof EmployeeStatus | null;

  @Field(() => Classification, { nullable: false })
  classification?: Classification;

  @Field(() => Department, { nullable: false })
  department?: Department;

  @Field(() => Organization, { nullable: false })
  organization?: Organization;

  @Field(() => [PositionEmployee], { nullable: true })
  PositionEmployee?: Array<PositionEmployee>;
}
