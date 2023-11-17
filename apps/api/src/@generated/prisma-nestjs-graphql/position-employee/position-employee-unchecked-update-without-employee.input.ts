import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class PositionEmployeeUncheckedUpdateWithoutEmployeeInput {
  @Field(() => String, { nullable: true })
  position_id?: string;
}
