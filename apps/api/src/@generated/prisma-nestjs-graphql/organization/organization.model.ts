import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Department } from '../department/department.model';
import { Position } from '../position/position.model';
import { Employee } from '../employee/employee.model';

@ObjectType()
export class Organization {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => [Department], { nullable: true })
  departments?: Array<Department>;

  @Field(() => [Position], { nullable: true })
  positions?: Array<Position>;

  @Field(() => [Employee], { nullable: true })
  employees?: Array<Employee>;
}
