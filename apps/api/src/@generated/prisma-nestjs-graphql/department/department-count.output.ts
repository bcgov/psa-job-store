import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class DepartmentCount {
  @Field(() => Int, { nullable: false })
  PositionRequest?: number;

  @Field(() => Int, { nullable: false })
  PositionRequestsByPaylistDepartment?: number;
}
