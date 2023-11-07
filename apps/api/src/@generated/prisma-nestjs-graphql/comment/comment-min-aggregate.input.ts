import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CommentMinAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  author_id?: true;

  @Field(() => Boolean, { nullable: true })
  record_id?: true;

  @Field(() => Boolean, { nullable: true })
  record_type?: true;

  @Field(() => Boolean, { nullable: true })
  text?: true;

  @Field(() => Boolean, { nullable: true })
  created_at?: true;

  @Field(() => Boolean, { nullable: true })
  updated_at?: true;

  @Field(() => Boolean, { nullable: true })
  deleted_at?: true;
}
