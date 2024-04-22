import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { CommentUncheckedUpdateManyWithoutAuthorNestedInput } from '../comment/comment-unchecked-update-many-without-author-nested.input';
import { JobProfileUncheckedUpdateManyWithoutOwnerNestedInput } from '../job-profile/job-profile-unchecked-update-many-without-owner-nested.input';

@InputType()
export class UserUncheckedUpdateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => [String], { nullable: true })
  roles?: Array<string>;

  @Field(() => GraphQLJSON, { nullable: true })
  metadata?: any;

  @Field(() => Date, { nullable: true })
  created_at?: Date | string;

  @Field(() => Date, { nullable: true })
  updated_at?: Date | string;

  @Field(() => Date, { nullable: true })
  deleted_at?: Date | string;

  @Field(() => CommentUncheckedUpdateManyWithoutAuthorNestedInput, { nullable: true })
  comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput;

  @Field(() => JobProfileUncheckedUpdateManyWithoutOwnerNestedInput, { nullable: true })
  JobProfile?: JobProfileUncheckedUpdateManyWithoutOwnerNestedInput;
}
