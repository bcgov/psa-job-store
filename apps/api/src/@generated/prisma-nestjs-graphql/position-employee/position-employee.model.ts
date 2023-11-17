import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Employee } from '../employee/employee.model';
import { Position } from '../position/position.model';

@ObjectType()
export class PositionEmployee {
  @Field(() => String, { nullable: false })
  employee_id!: string;

  @Field(() => String, { nullable: false })
  position_id!: string;

  @Field(() => Employee, { nullable: false })
  employee?: Employee;

  @Field(() => Position, { nullable: false })
  position?: Position;
}
