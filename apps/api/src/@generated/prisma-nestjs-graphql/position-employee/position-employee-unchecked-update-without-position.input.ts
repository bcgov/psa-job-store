import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class PositionEmployeeUncheckedUpdateWithoutPositionInput {
  @Field(() => String, { nullable: true })
  employee_id?: string;
}
