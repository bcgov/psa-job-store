import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';

@InputType()
export class CommentScalarWhereInput {
  @Field(() => [CommentScalarWhereInput], { nullable: true })
  AND?: Array<CommentScalarWhereInput>;

  @Field(() => [CommentScalarWhereInput], { nullable: true })
  OR?: Array<CommentScalarWhereInput>;

  @Field(() => [CommentScalarWhereInput], { nullable: true })
  NOT?: Array<CommentScalarWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

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
}
