import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileScopeCreateManyInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  description!: string;
}
