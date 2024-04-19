import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileMinimumRequirementsMaxAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  requirement?: true;

  @Field(() => Boolean, { nullable: true })
  grade?: true;
}
