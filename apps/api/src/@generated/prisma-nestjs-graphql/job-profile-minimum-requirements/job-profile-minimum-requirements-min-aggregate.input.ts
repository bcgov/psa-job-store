import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileMinimumRequirementsMinAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  requirement?: true;

  @Field(() => Boolean, { nullable: true })
  grade?: true;
}
