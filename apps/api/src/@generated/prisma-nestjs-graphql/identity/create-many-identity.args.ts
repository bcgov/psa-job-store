import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { IdentityCreateManyInput } from './identity-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyIdentityArgs {
  @Field(() => [IdentityCreateManyInput], { nullable: false })
  @Type(() => IdentityCreateManyInput)
  data!: Array<IdentityCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
