import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutJobProfileInput } from './user-update-without-job-profile.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutJobProfileInput {
  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;

  @Field(() => UserUpdateWithoutJobProfileInput, { nullable: false })
  @Type(() => UserUpdateWithoutJobProfileInput)
  data!: UserUpdateWithoutJobProfileInput;
}
