import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutJobProfileInput } from './user-create-without-job-profile.input';

@InputType()
export class UserCreateOrConnectWithoutJobProfileInput {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  @Type(() => UserWhereUniqueInput)
  where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;

  @Field(() => UserCreateWithoutJobProfileInput, { nullable: false })
  @Type(() => UserCreateWithoutJobProfileInput)
  create!: UserCreateWithoutJobProfileInput;
}
