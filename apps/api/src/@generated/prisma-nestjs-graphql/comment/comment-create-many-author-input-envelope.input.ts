import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { CommentCreateManyAuthorInput } from './comment-create-many-author.input';

@InputType()
export class CommentCreateManyAuthorInputEnvelope {
  @Field(() => [CommentCreateManyAuthorInput], { nullable: false })
  @Type(() => CommentCreateManyAuthorInput)
  data!: Array<CommentCreateManyAuthorInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
