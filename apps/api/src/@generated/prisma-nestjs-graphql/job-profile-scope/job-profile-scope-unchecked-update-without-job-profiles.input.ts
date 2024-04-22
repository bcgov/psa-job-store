import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileScopeUncheckedUpdateWithoutJob_profilesInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
