import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutCommentsInput } from './user-create-or-connect-without-comments.input';
import { UserCreateWithoutCommentsInput } from './user-create-without-comments.input';
import { UserUpdateToOneWithWhereWithoutCommentsInput } from './user-update-to-one-with-where-without-comments.input';
import { UserUpsertWithoutCommentsInput } from './user-upsert-without-comments.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserUpdateOneRequiredWithoutCommentsNestedInput {
  @Field(() => UserCreateWithoutCommentsInput, { nullable: true })
  @Type(() => UserCreateWithoutCommentsInput)
  create?: UserCreateWithoutCommentsInput;

  @Field(() => UserCreateOrConnectWithoutCommentsInput, { nullable: true })
  @Type(() => UserCreateOrConnectWithoutCommentsInput)
  connectOrCreate?: UserCreateOrConnectWithoutCommentsInput;

  @Field(() => UserUpsertWithoutCommentsInput, { nullable: true })
  @Type(() => UserUpsertWithoutCommentsInput)
  upsert?: UserUpsertWithoutCommentsInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;

  @Field(() => UserUpdateToOneWithWhereWithoutCommentsInput, { nullable: true })
  @Type(() => UserUpdateToOneWithWhereWithoutCommentsInput)
  update?: UserUpdateToOneWithWhereWithoutCommentsInput;
}
