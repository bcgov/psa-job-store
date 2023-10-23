import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IdentityWhereInput } from './identity-where.input';

@InputType()
export class IdentityListRelationFilter {
  @Field(() => IdentityWhereInput, { nullable: true })
  every?: IdentityWhereInput;

  @Field(() => IdentityWhereInput, { nullable: true })
  some?: IdentityWhereInput;

  @Field(() => IdentityWhereInput, { nullable: true })
  none?: IdentityWhereInput;
}
