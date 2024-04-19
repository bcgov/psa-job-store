import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileContextUncheckedUpdateWithoutJob_profileInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  description?: string;
}
