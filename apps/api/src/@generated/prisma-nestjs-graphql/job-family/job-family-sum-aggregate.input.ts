import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobFamilySumAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;
}
