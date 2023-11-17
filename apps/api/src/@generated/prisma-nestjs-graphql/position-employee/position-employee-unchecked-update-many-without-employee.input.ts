import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class PositionEmployeeUncheckedUpdateManyWithoutEmployeeInput {
  @Field(() => String, { nullable: true })
  position_id?: string;
}
