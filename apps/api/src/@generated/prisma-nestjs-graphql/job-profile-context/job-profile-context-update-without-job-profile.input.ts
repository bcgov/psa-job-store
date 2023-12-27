import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileContextUpdateWithoutJob_profileInput {
  @Field(() => String, { nullable: true })
  description?: string;
}
