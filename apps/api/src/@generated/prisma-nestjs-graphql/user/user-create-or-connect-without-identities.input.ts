import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutIdentitiesInput } from './user-create-without-identities.input';

@InputType()
export class UserCreateOrConnectWithoutIdentitiesInput {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  @Type(() => UserWhereUniqueInput)
  where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;

  @Field(() => UserCreateWithoutIdentitiesInput, { nullable: false })
  @Type(() => UserCreateWithoutIdentitiesInput)
  create!: UserCreateWithoutIdentitiesInput;
}
