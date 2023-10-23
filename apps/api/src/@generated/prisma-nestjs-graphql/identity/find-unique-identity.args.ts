import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IdentityWhereUniqueInput } from './identity-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueIdentityArgs {
  @Field(() => IdentityWhereUniqueInput, { nullable: false })
  @Type(() => IdentityWhereUniqueInput)
  where!: Prisma.AtLeast<IdentityWhereUniqueInput, 'sub_identity_provider'>;
}
