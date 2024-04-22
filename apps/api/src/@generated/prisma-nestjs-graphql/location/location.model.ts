import { Field, ObjectType } from '@nestjs/graphql';
import { Department } from '../department/department.model';
import { PositionRequest } from '../position-request/position-request.model';

@ObjectType()
export class Location {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  peoplesoft_id!: string;

  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  effective_status!: string;

  @Field(() => Date, { nullable: false })
  effective_date!: Date;

  @Field(() => [Department], { nullable: true })
  departments?: Array<Department>;

  @Field(() => [PositionRequest], { nullable: true })
  positionRequests?: Array<PositionRequest>;
}
