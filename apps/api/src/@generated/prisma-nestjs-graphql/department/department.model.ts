import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Organization } from '../organization/organization.model';
import { Position } from '../position/position.model';
import { Employee } from '../employee/employee.model';

@ObjectType()
export class Department {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  organization_id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => Organization, { nullable: false })
  organization?: Organization;

  @Field(() => [Position], { nullable: true })
  positions?: Array<Position>;

  @Field(() => [Employee], { nullable: true })
  employees?: Array<Employee>;
}
