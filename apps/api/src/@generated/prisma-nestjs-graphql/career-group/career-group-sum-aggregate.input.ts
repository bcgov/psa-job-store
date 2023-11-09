import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CareerGroupSumAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;
}
