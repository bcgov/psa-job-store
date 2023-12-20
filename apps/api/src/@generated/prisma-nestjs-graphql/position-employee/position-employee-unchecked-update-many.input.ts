import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class PositionEmployeeUncheckedUpdateManyInput {
  @Field(() => String, { nullable: true })
  employee_id?: string;

  @Field(() => String, { nullable: true })
  position_id?: string;
}
