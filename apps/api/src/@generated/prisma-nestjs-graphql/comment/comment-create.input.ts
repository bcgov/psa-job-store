import { Field, InputType, Int } from '@nestjs/graphql';
import { UserCreateNestedOneWithoutCommentsInput } from '../user/user-create-nested-one-without-comments.input';

@InputType()
export class CommentCreateInput {
  @Field(() => Int, { nullable: false })
  record_id!: number;

  @Field(() => String, { nullable: false })
  record_type!: string;

  @Field(() => String, { nullable: false })
  text!: string;

  @Field(() => Date, { nullable: true })
  created_at?: Date | string;

  @Field(() => Date, { nullable: true })
  updated_at?: Date | string;

  @Field(() => Date, { nullable: true })
  deleted_at?: Date | string;

  @Field(() => UserCreateNestedOneWithoutCommentsInput, { nullable: false })
  author!: UserCreateNestedOneWithoutCommentsInput;
}
