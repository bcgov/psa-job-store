import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileCareerGroupAvgAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;
}
