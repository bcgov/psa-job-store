import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileScopeUncheckedCreateWithoutJob_profilesInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  description!: string;
}
