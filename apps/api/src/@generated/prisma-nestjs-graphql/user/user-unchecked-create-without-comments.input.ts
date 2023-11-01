import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IdentityUncheckedCreateNestedManyWithoutUserInput } from '../identity/identity-unchecked-create-nested-many-without-user.input';
import { JobProfileUncheckedCreateNestedManyWithoutOwnerInput } from '../job-profile/job-profile-unchecked-create-nested-many-without-owner.input';

@InputType()
export class UserUncheckedCreateWithoutCommentsInput {
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

  @Field(() => IdentityUncheckedCreateNestedManyWithoutUserInput, { nullable: true })
  identities?: IdentityUncheckedCreateNestedManyWithoutUserInput;

  @Field(() => JobProfileUncheckedCreateNestedManyWithoutOwnerInput, { nullable: true })
  JobProfile?: JobProfileUncheckedCreateNestedManyWithoutOwnerInput;
}
