import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateWithoutIdentitiesInput } from './user-update-without-identities.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutIdentitiesInput } from './user-create-without-identities.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutIdentitiesInput {
  @Field(() => UserUpdateWithoutIdentitiesInput, { nullable: false })
  @Type(() => UserUpdateWithoutIdentitiesInput)
  update!: UserUpdateWithoutIdentitiesInput;

  @Field(() => UserCreateWithoutIdentitiesInput, { nullable: false })
  @Type(() => UserCreateWithoutIdentitiesInput)
  create!: UserCreateWithoutIdentitiesInput;

  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;
}
