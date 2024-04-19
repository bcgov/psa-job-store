import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommentSumAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  record_id?: number;
}
