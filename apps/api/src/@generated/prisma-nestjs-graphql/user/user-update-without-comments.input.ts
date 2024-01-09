import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileUpdateManyWithoutOwnerNestedInput } from '../job-profile/job-profile-update-many-without-owner-nested.input';

@InputType()
export class UserUpdateWithoutCommentsInput {
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

  @Field(() => JobProfileUpdateManyWithoutOwnerNestedInput, { nullable: true })
  JobProfile?: JobProfileUpdateManyWithoutOwnerNestedInput;
}
