import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class MinistryUpdateWithoutJob_profilesInput {
  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => String, { nullable: true })
  name?: string;
}
