import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { UserCreateWithoutJobProfileInput } from './user-create-without-job-profile.input';
import { UserUpdateWithoutJobProfileInput } from './user-update-without-job-profile.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutJobProfileInput {
  @Field(() => UserUpdateWithoutJobProfileInput, { nullable: false })
  @Type(() => UserUpdateWithoutJobProfileInput)
  update!: UserUpdateWithoutJobProfileInput;

  @Field(() => UserCreateWithoutJobProfileInput, { nullable: false })
  @Type(() => UserCreateWithoutJobProfileInput)
  create!: UserCreateWithoutJobProfileInput;

  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;
}
