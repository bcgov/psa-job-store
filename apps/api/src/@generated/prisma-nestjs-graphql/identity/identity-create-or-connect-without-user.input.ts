import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IdentityWhereUniqueInput } from './identity-where-unique.input';
import { Type } from 'class-transformer';
import { IdentityCreateWithoutUserInput } from './identity-create-without-user.input';

@InputType()
export class IdentityCreateOrConnectWithoutUserInput {
  @Field(() => IdentityWhereUniqueInput, { nullable: false })
  @Type(() => IdentityWhereUniqueInput)
  where!: Prisma.AtLeast<IdentityWhereUniqueInput, 'sub_identity_provider'>;

  @Field(() => IdentityCreateWithoutUserInput, { nullable: false })
  @Type(() => IdentityCreateWithoutUserInput)
  create!: IdentityCreateWithoutUserInput;
}
