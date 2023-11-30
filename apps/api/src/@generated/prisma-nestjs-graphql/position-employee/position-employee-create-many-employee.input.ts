import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class PositionEmployeeCreateManyEmployeeInput {
  @Field(() => String, { nullable: false })
  position_id!: string;
}
