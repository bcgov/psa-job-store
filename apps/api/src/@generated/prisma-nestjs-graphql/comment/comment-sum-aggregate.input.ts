import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CommentSumAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  record_id?: true;
}
