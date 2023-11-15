import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateWithoutJob_profilesInput } from './user-update-without-job-profiles.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutJob_profilesInput } from './user-create-without-job-profiles.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutJob_profilesInput {
  @Field(() => UserUpdateWithoutJob_profilesInput, { nullable: false })
  @Type(() => UserUpdateWithoutJob_profilesInput)
  update!: UserUpdateWithoutJob_profilesInput;

  @Field(() => UserCreateWithoutJob_profilesInput, { nullable: false })
  @Type(() => UserCreateWithoutJob_profilesInput)
  create!: UserCreateWithoutJob_profilesInput;

  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;
}
