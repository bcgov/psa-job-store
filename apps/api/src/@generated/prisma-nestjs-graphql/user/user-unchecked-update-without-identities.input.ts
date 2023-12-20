import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommentUncheckedUpdateManyWithoutAuthorNestedInput } from '../comment/comment-unchecked-update-many-without-author-nested.input';
import { JobProfileUncheckedUpdateManyWithoutOwnerNestedInput } from '../job-profile/job-profile-unchecked-update-many-without-owner-nested.input';

@InputType()
export class UserUncheckedUpdateWithoutIdentitiesInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => [String], { nullable: true })
  roles?: Array<string>;

  @Field(() => Date, { nullable: true })
  created_at?: Date | string;

  @Field(() => Date, { nullable: true })
  updated_at?: Date | string;

  @Field(() => Date, { nullable: true })
  deleted_at?: Date | string;

  @Field(() => CommentUncheckedUpdateManyWithoutAuthorNestedInput, { nullable: true })
  comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput;

  @Field(() => JobProfileUncheckedUpdateManyWithoutOwnerNestedInput, { nullable: true })
  job_profiles?: JobProfileUncheckedUpdateManyWithoutOwnerNestedInput;
}
