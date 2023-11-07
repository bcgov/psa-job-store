import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutJobProfileInput } from './user-create-without-job-profile.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutJobProfileInput } from './user-create-or-connect-without-job-profile.input';
import { UserUpsertWithoutJobProfileInput } from './user-upsert-without-job-profile.input';
import { UserWhereInput } from './user-where.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateToOneWithWhereWithoutJobProfileInput } from './user-update-to-one-with-where-without-job-profile.input';

@InputType()
export class UserUpdateOneWithoutJobProfileNestedInput {
  @Field(() => UserCreateWithoutJobProfileInput, { nullable: true })
  @Type(() => UserCreateWithoutJobProfileInput)
  create?: UserCreateWithoutJobProfileInput;

  @Field(() => UserCreateOrConnectWithoutJobProfileInput, { nullable: true })
  @Type(() => UserCreateOrConnectWithoutJobProfileInput)
  connectOrCreate?: UserCreateOrConnectWithoutJobProfileInput;

  @Field(() => UserUpsertWithoutJobProfileInput, { nullable: true })
  @Type(() => UserUpsertWithoutJobProfileInput)
  upsert?: UserUpsertWithoutJobProfileInput;

  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  disconnect?: UserWhereInput;

  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  delete?: UserWhereInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;

  @Field(() => UserUpdateToOneWithWhereWithoutJobProfileInput, { nullable: true })
  @Type(() => UserUpdateToOneWithWhereWithoutJobProfileInput)
  update?: UserUpdateToOneWithWhereWithoutJobProfileInput;
}
