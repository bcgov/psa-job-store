import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileStreamUpdateWithoutJob_profilesInput {
  @Field(() => String, { nullable: true })
  name?: string;
}
