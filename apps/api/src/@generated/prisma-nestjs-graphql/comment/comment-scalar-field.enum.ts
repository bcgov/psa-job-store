import { registerEnumType } from '@nestjs/graphql';

export enum CommentScalarFieldEnum {
  id = 'id',
  author_id = 'author_id',
  record_id = 'record_id',
  record_type = 'record_type',
  text = 'text',
  created_at = 'created_at',
  updated_at = 'updated_at',
  deleted_at = 'deleted_at',
}

registerEnumType(CommentScalarFieldEnum, { name: 'CommentScalarFieldEnum', description: undefined });
