import { registerEnumType } from '@nestjs/graphql';

export enum CommentOrderByRelevanceFieldEnum {
  author_id = 'author_id',
  record_type = 'record_type',
  text = 'text',
}

registerEnumType(CommentOrderByRelevanceFieldEnum, {
  name: 'CommentOrderByRelevanceFieldEnum',
  description: undefined,
});
