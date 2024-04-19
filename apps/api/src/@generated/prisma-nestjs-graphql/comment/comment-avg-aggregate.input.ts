import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CommentAvgAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  record_id?: true;
}
