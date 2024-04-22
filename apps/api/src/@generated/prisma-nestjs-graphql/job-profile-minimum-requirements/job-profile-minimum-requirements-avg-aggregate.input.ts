import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileMinimumRequirementsAvgAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;
}
