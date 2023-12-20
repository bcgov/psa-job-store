import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IdentityScalarWhereInput } from './identity-scalar-where.input';
import { Type } from 'class-transformer';
import { IdentityUpdateManyMutationInput } from './identity-update-many-mutation.input';

@InputType()
export class IdentityUpdateManyWithWhereWithoutUserInput {
  @Field(() => IdentityScalarWhereInput, { nullable: false })
  @Type(() => IdentityScalarWhereInput)
  where!: IdentityScalarWhereInput;

  @Field(() => IdentityUpdateManyMutationInput, { nullable: false })
  @Type(() => IdentityUpdateManyMutationInput)
  data!: IdentityUpdateManyMutationInput;
}
