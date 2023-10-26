import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class IntListFilter {
  @Field(() => [Int], { nullable: true })
  equals?: Array<number>;

  @Field(() => Int, { nullable: true })
  has?: number;

  @Field(() => [Int], { nullable: true })
  hasEvery?: Array<number>;

  @Field(() => [Int], { nullable: true })
  hasSome?: Array<number>;

  @Field(() => Boolean, { nullable: true })
  isEmpty?: boolean;
}
