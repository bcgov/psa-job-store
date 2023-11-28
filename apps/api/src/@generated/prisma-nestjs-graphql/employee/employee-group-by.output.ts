import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { EmployeeStatus } from '../prisma/employee-status.enum';
import { EmployeeCountAggregate } from './employee-count-aggregate.output';
import { EmployeeMinAggregate } from './employee-min-aggregate.output';
import { EmployeeMaxAggregate } from './employee-max-aggregate.output';

@ObjectType()
export class EmployeeGroupBy {
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
  status?: keyof typeof EmployeeStatus;

  @Field(() => EmployeeCountAggregate, { nullable: true })
  _count?: EmployeeCountAggregate;

  @Field(() => EmployeeMinAggregate, { nullable: true })
  _min?: EmployeeMinAggregate;

  @Field(() => EmployeeMaxAggregate, { nullable: true })
  _max?: EmployeeMaxAggregate;
}
