import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommentUpdateManyWithoutAuthorNestedInput } from '../comment/comment-update-many-without-author-nested.input';
import { IdentityUpdateManyWithoutUserNestedInput } from '../identity/identity-update-many-without-user-nested.input';
import { JobProfileUpdateManyWithoutOwnerNestedInput } from '../job-profile/job-profile-update-many-without-owner-nested.input';

@InputType()
export class UserUpdateInput {
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

  @Field(() => CommentUpdateManyWithoutAuthorNestedInput, { nullable: true })
  comments?: CommentUpdateManyWithoutAuthorNestedInput;

  @Field(() => IdentityUpdateManyWithoutUserNestedInput, { nullable: true })
  identities?: IdentityUpdateManyWithoutUserNestedInput;

  @Field(() => JobProfileUpdateManyWithoutOwnerNestedInput, { nullable: true })
  job_profiles?: JobProfileUpdateManyWithoutOwnerNestedInput;
}
