import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutIdentitiesInput } from './user-update-without-identities.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutIdentitiesInput {
  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;

  @Field(() => UserUpdateWithoutIdentitiesInput, { nullable: false })
  @Type(() => UserUpdateWithoutIdentitiesInput)
  data!: UserUpdateWithoutIdentitiesInput;
}
