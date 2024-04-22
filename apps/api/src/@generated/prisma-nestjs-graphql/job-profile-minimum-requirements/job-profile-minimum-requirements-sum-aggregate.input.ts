import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileMinimumRequirementsSumAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;
}
