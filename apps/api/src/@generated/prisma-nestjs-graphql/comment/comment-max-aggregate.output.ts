import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommentMaxAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  author_id?: string;

  @Field(() => Int, { nullable: true })
  record_id?: number;

  @Field(() => String, { nullable: true })
  record_type?: string;

  @Field(() => String, { nullable: true })
  text?: string;

  @Field(() => Date, { nullable: true })
  created_at?: Date | string;

  @Field(() => Date, { nullable: true })
  updated_at?: Date | string;

  @Field(() => Date, { nullable: true })
  deleted_at?: Date | string;
}
