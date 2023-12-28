import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileCareerGroupUpdateWithoutJob_profilesInput {
  @Field(() => String, { nullable: true })
  name?: string;
}
