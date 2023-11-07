import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { IdentityCreateInput } from './identity-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneIdentityArgs {
  @Field(() => IdentityCreateInput, { nullable: false })
  @Type(() => IdentityCreateInput)
  data!: IdentityCreateInput;
}
