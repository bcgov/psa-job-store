import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeStatus } from '../prisma/employee-status.enum';

@InputType()
export class EmployeeUncheckedUpdateManyInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  classification_id?: string;

  @Field(() => String, { nullable: true })
  department_id?: string;

  @Field(() => String, { nullable: true })
  organization_id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => EmployeeStatus, { nullable: true })
  status?: keyof typeof EmployeeStatus;
}
