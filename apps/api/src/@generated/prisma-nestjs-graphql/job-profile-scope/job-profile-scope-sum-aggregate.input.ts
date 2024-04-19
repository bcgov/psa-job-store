import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileScopeSumAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;
}
