import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileContextUpdateWithoutJob_profileInput {
  @Field(() => String, { nullable: true })
  description?: string;
}
