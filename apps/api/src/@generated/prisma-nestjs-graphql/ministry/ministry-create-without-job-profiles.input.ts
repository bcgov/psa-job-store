import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class MinistryCreateWithoutJob_profilesInput {
  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  name!: string;
}
