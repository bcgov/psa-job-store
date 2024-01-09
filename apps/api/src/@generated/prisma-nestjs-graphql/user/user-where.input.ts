import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { StringListFilter } from '../prisma/string-list-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { CommentListRelationFilter } from '../comment/comment-list-relation-filter.input';
import { JobProfileListRelationFilter } from '../job-profile/job-profile-list-relation-filter.input';

@InputType()
export class UserWhereInput {
  @Field(() => [UserWhereInput], { nullable: true })
  AND?: Array<UserWhereInput>;

  @Field(() => [UserWhereInput], { nullable: true })
  OR?: Array<UserWhereInput>;

  @Field(() => [UserWhereInput], { nullable: true })
  NOT?: Array<UserWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  id?: UuidFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  email?: StringFilter;

  @Field(() => StringListFilter, { nullable: true })
  roles?: StringListFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  created_at?: DateTimeFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  updated_at?: DateTimeFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  deleted_at?: DateTimeFilter;

  @Field(() => CommentListRelationFilter, { nullable: true })
  comments?: CommentListRelationFilter;

  @Field(() => JobProfileListRelationFilter, { nullable: true })
  JobProfile?: JobProfileListRelationFilter;
}
