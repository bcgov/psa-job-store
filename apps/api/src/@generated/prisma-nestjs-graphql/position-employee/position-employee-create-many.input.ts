import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class PositionEmployeeCreateManyInput {
  @Field(() => String, { nullable: false })
  employee_id!: string;

  @Field(() => String, { nullable: false })
  position_id!: string;
}
