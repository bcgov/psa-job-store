import { Args, Query, Resolver } from '@nestjs/graphql';
import { Comment } from '../../@generated/prisma-nestjs-graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { CommentService } from './comment.service';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Roles('classification', 'hiring-manager', 'total-compensation')
  @Query(() => [Comment], { name: 'comments' })
  getComments(
    @Args('record_id', { type: () => Number }) record_id: number,
    @Args('record_type', { type: () => String }) record_type: string,
  ) {
    return this.commentService.getComments(+record_id, record_type);
  }

  // @Query(() => Comment, { name: 'comment' })
  // async getJobProfile(@Args('id') id: string) {
  //   const res = await this.commentService.getComment(+id);
  //   return res;
  // }
}
