import { Args, Query, Resolver } from '@nestjs/graphql';
import { Comment } from '../../@generated/prisma-nestjs-graphql';
import { CommentService } from './comment.service';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}
  @Query(() => [Comment], { name: 'comments' })
  getComments(@Args('record_id') record_id: number) {
    return this.commentService.getComments(+record_id);
  }

  @Query(() => Comment, { name: 'comment' })
  async getJobProfile(@Args('id') id: string) {
    const res = await this.commentService.getComment(+id);
    return res;
  }
}
