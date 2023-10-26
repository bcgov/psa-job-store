import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobCategoryAvgAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;
}
