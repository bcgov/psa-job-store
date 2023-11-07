import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommentCreateNestedManyWithoutAuthorInput } from '../comment/comment-create-nested-many-without-author.input';
import { IdentityCreateNestedManyWithoutUserInput } from '../identity/identity-create-nested-many-without-user.input';
import { JobProfileCreateNestedManyWithoutOwnerInput } from '../job-profile/job-profile-create-nested-many-without-owner.input';

@InputType()
export class UserCreateInput {
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

  @Field(() => CommentCreateNestedManyWithoutAuthorInput, { nullable: true })
  comments?: CommentCreateNestedManyWithoutAuthorInput;

  @Field(() => IdentityCreateNestedManyWithoutUserInput, { nullable: true })
  identities?: IdentityCreateNestedManyWithoutUserInput;

  @Field(() => JobProfileCreateNestedManyWithoutOwnerInput, { nullable: true })
  JobProfile?: JobProfileCreateNestedManyWithoutOwnerInput;
}
