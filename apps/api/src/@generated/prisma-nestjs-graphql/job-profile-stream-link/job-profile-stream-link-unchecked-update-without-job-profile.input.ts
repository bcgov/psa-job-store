import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileStreamLinkUncheckedUpdateWithoutJobProfileInput {
  @Field(() => Int, { nullable: true })
  streamId?: number;
}
