import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { UserCreateWithoutJobProfileInput } from './user-create-without-job-profile.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateOrConnectWithoutJobProfileInput {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  @Type(() => UserWhereUniqueInput)
  where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;

  @Field(() => UserCreateWithoutJobProfileInput, { nullable: false })
  @Type(() => UserCreateWithoutJobProfileInput)
  create!: UserCreateWithoutJobProfileInput;
}
