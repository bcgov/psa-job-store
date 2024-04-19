import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { CommentCreateWithoutAuthorInput } from './comment-create-without-author.input';
import { CommentUpdateWithoutAuthorInput } from './comment-update-without-author.input';
import { CommentWhereUniqueInput } from './comment-where-unique.input';

@InputType()
export class CommentUpsertWithWhereUniqueWithoutAuthorInput {
  @Field(() => CommentWhereUniqueInput, { nullable: false })
  @Type(() => CommentWhereUniqueInput)
  where!: Prisma.AtLeast<CommentWhereUniqueInput, 'id'>;

  @Field(() => CommentUpdateWithoutAuthorInput, { nullable: false })
  @Type(() => CommentUpdateWithoutAuthorInput)
  update!: CommentUpdateWithoutAuthorInput;

  @Field(() => CommentCreateWithoutAuthorInput, { nullable: false })
  @Type(() => CommentCreateWithoutAuthorInput)
  create!: CommentCreateWithoutAuthorInput;
}
