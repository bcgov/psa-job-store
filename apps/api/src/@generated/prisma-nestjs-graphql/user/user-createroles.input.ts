import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserCreaterolesInput {
  @Field(() => [String], { nullable: false })
  set!: Array<string>;
}
