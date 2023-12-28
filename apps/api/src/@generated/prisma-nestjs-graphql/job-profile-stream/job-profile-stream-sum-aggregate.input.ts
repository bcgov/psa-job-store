import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileStreamSumAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;
}
