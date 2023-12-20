import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IdentityCreateManyUserInput } from './identity-create-many-user.input';
import { Type } from 'class-transformer';

@InputType()
export class IdentityCreateManyUserInputEnvelope {
  @Field(() => [IdentityCreateManyUserInput], { nullable: false })
  @Type(() => IdentityCreateManyUserInput)
  data!: Array<IdentityCreateManyUserInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
