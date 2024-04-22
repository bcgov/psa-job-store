import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { CommentUpdateManyMutationInput } from './comment-update-many-mutation.input';
import { CommentWhereInput } from './comment-where.input';

@ArgsType()
export class UpdateManyCommentArgs {
  @Field(() => CommentUpdateManyMutationInput, { nullable: false })
  @Type(() => CommentUpdateManyMutationInput)
  data!: CommentUpdateManyMutationInput;

  @Field(() => CommentWhereInput, { nullable: true })
  @Type(() => CommentWhereInput)
  where?: CommentWhereInput;
}
