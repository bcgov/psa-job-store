import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileScopeUpdateManyMutationInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
