import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EmployeeGroupMinAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  name?: true;
}
