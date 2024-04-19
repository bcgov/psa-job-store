import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommentAvgAggregate {
  @Field(() => Float, { nullable: true })
  id?: number;

  @Field(() => Float, { nullable: true })
  record_id?: number;
}
