import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { UserUpdateOneRequiredWithoutCommentsNestedInput } from '../user/user-update-one-required-without-comments-nested.input';

@InputType()
export class CommentUpdateInput {
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

  @Field(() => UserUpdateOneRequiredWithoutCommentsNestedInput, { nullable: true })
  author?: UserUpdateOneRequiredWithoutCommentsNestedInput;
}
