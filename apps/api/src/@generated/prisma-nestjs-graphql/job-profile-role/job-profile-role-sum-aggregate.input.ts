import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileRoleSumAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;
}
