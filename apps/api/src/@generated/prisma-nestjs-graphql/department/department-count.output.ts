import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DepartmentCount {
  @Field(() => Int, { nullable: false })
  PositionRequest?: number;

  @Field(() => Int, { nullable: false })
  PositionRequestsByPaylistDepartment?: number;
}
