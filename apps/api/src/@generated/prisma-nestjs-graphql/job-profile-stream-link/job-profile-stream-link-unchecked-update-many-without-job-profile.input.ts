import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileStreamLinkUncheckedUpdateManyWithoutJobProfileInput {
  @Field(() => Int, { nullable: true })
  streamId?: number;
}
