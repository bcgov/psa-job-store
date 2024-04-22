import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { CommentCreateManyInput } from './comment-create-many.input';

@ArgsType()
export class CreateManyCommentArgs {
  @Field(() => [CommentCreateManyInput], { nullable: false })
  @Type(() => CommentCreateManyInput)
  data!: Array<CommentCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
