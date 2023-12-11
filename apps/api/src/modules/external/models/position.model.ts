import { Field, ObjectType } from '@nestjs/graphql';
import { Classification } from '../../../@generated/prisma-nestjs-graphql';
// import { Classification } from '../classification/classification.model';
// import { Department } from '../department/department.model';
// import { Organization } from '../organization/organization.model';
// import { PositionEmployee } from '../position-employee/position-employee.model';

@ObjectType()
export class Position {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  classification_id!: string;

  @Field(() => String, { nullable: false })
  department_id!: string;

  @Field(() => String, { nullable: false })
  organization_id!: string;

  @Field(() => String, { nullable: false })
  supervisor_id!: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: true })
  job_profile_number!: string | null;

  @Field(() => Classification, { nullable: false })
  classification?: Classification;

  // @Field(() => Department, { nullable: false })
  // department?: Department;

  // @Field(() => Organization, { nullable: false })
  // organization?: Organization;

  // @Field(() => [PositionEmployee], { nullable: true })
  // employees?: Array<PositionEmployee>;
}
