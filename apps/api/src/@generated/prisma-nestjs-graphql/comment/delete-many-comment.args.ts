import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { CommentWhereInput } from './comment-where.input';

@ArgsType()
export class DeleteManyCommentArgs {
  @Field(() => CommentWhereInput, { nullable: true })
  @Type(() => CommentWhereInput)
  where?: CommentWhereInput;
}
