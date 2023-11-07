import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class GridUpdateWithoutClassificationsInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => [Int], { nullable: true })
  steps?: Array<number>;
}
