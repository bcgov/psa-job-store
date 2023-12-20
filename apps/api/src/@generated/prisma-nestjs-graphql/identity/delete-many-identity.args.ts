import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { IdentityWhereInput } from './identity-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyIdentityArgs {
  @Field(() => IdentityWhereInput, { nullable: true })
  @Type(() => IdentityWhereInput)
  where?: IdentityWhereInput;
}
