import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileScopeMaxAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  name?: true;

  @Field(() => Boolean, { nullable: true })
  description?: true;
}
