import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutJobProfileInput } from './user-create-or-connect-without-job-profile.input';
import { UserCreateWithoutJobProfileInput } from './user-create-without-job-profile.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutJobProfileInput {
  @Field(() => UserCreateWithoutJobProfileInput, { nullable: true })
  @Type(() => UserCreateWithoutJobProfileInput)
  create?: UserCreateWithoutJobProfileInput;

  @Field(() => UserCreateOrConnectWithoutJobProfileInput, { nullable: true })
  @Type(() => UserCreateOrConnectWithoutJobProfileInput)
  connectOrCreate?: UserCreateOrConnectWithoutJobProfileInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
}
