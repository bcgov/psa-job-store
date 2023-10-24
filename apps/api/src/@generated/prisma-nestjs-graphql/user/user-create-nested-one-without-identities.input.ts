import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutIdentitiesInput } from './user-create-without-identities.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutIdentitiesInput } from './user-create-or-connect-without-identities.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutIdentitiesInput {
  @Field(() => UserCreateWithoutIdentitiesInput, { nullable: true })
  @Type(() => UserCreateWithoutIdentitiesInput)
  create?: UserCreateWithoutIdentitiesInput;

  @Field(() => UserCreateOrConnectWithoutIdentitiesInput, { nullable: true })
  @Type(() => UserCreateOrConnectWithoutIdentitiesInput)
  connectOrCreate?: UserCreateOrConnectWithoutIdentitiesInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;
}
