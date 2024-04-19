import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { UserUpdateWithoutJobProfileInput } from './user-update-without-job-profile.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutJobProfileInput {
  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;

  @Field(() => UserUpdateWithoutJobProfileInput, { nullable: false })
  @Type(() => UserUpdateWithoutJobProfileInput)
  data!: UserUpdateWithoutJobProfileInput;
}
