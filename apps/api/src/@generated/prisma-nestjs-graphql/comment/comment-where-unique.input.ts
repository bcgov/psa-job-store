import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { CommentWhereInput } from './comment-where.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { UserRelationFilter } from '../user/user-relation-filter.input';

@InputType()
export class CommentWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => [CommentWhereInput], { nullable: true })
  AND?: Array<CommentWhereInput>;

  @Field(() => [CommentWhereInput], { nullable: true })
  OR?: Array<CommentWhereInput>;

  @Field(() => [CommentWhereInput], { nullable: true })
  NOT?: Array<CommentWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  author_id?: UuidFilter;

  @Field(() => IntFilter, { nullable: true })
  record_id?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  record_type?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  text?: StringFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  created_at?: DateTimeFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  updated_at?: DateTimeFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  deleted_at?: DateTimeFilter;

  @Field(() => UserRelationFilter, { nullable: true })
  author?: UserRelationFilter;
}
