import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class PositionEmployeeCreateManyPositionInput {
  @Field(() => String, { nullable: false })
  employee_id!: string;
}
