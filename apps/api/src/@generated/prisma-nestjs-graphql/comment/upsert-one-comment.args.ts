import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { CommentCreateInput } from './comment-create.input';
import { CommentUpdateInput } from './comment-update.input';
import { CommentWhereUniqueInput } from './comment-where-unique.input';

@ArgsType()
export class UpsertOneCommentArgs {
  @Field(() => CommentWhereUniqueInput, { nullable: false })
  @Type(() => CommentWhereUniqueInput)
  where!: Prisma.AtLeast<CommentWhereUniqueInput, 'id'>;

  @Field(() => CommentCreateInput, { nullable: false })
  @Type(() => CommentCreateInput)
  create!: CommentCreateInput;

  @Field(() => CommentUpdateInput, { nullable: false })
  @Type(() => CommentUpdateInput)
  update!: CommentUpdateInput;
}
