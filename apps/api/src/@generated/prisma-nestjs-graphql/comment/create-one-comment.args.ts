import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { CommentCreateInput } from './comment-create.input';

@ArgsType()
export class CreateOneCommentArgs {
  @Field(() => CommentCreateInput, { nullable: false })
  @Type(() => CommentCreateInput)
  data!: CommentCreateInput;
}
