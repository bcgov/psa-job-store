import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class IdentityCreateWithoutUserInput {
  @Field(() => String, { nullable: false })
  sub!: string;

  @Field(() => String, { nullable: false })
  identity_provider!: string;

  @Field(() => Date, { nullable: true })
  created_at?: Date | string;

  @Field(() => Date, { nullable: true })
  updated_at?: Date | string;

  @Field(() => Date, { nullable: true })
  deleted_at?: Date | string;
}
