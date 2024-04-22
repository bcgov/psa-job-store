import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileScopeUpdateWithoutJob_profilesInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
