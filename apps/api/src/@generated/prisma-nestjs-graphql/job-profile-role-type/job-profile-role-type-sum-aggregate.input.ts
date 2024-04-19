import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileRoleTypeSumAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;
}
