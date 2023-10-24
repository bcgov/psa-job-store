import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ClassificationSumAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  grid_id?: true;

  @Field(() => Boolean, { nullable: true })
  occupation_group_id?: true;
}
