import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommentUncheckedCreateNestedManyWithoutAuthorInput } from '../comment/comment-unchecked-create-nested-many-without-author.input';
import { IdentityUncheckedCreateNestedManyWithoutUserInput } from '../identity/identity-unchecked-create-nested-many-without-user.input';

@InputType()
export class UserUncheckedCreateWithoutJob_profilesInput {
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

  @Field(() => CommentUncheckedCreateNestedManyWithoutAuthorInput, { nullable: true })
  comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput;

  @Field(() => IdentityUncheckedCreateNestedManyWithoutUserInput, { nullable: true })
  identities?: IdentityUncheckedCreateNestedManyWithoutUserInput;
}
