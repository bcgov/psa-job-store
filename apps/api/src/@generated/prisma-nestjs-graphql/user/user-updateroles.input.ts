import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserUpdaterolesInput {
  @Field(() => [String], { nullable: true })
  set?: Array<string>;

  @Field(() => [String], { nullable: true })
  push?: Array<string>;
}
