import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class GridUpdatestepsInput {
  @Field(() => [Int], { nullable: true })
  set?: Array<number>;

  @Field(() => [Int], { nullable: true })
  push?: Array<number>;
}
