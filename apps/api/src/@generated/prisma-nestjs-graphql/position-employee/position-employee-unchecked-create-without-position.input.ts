import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class PositionEmployeeUncheckedCreateWithoutPositionInput {
  @Field(() => String, { nullable: false })
  employee_id!: string;
}
