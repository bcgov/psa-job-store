import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { JobProfileCreateNestedManyWithoutOwnerInput } from '../job-profile/job-profile-create-nested-many-without-owner.input';

@InputType()
export class UserCreateWithoutCommentsInput {
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

  @Field(() => JobProfileCreateNestedManyWithoutOwnerInput, { nullable: true })
  JobProfile?: JobProfileCreateNestedManyWithoutOwnerInput;
}
