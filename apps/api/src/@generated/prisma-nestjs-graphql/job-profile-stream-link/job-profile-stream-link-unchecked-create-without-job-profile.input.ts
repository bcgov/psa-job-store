import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileStreamLinkUncheckedCreateWithoutJobProfileInput {
  @Field(() => Int, { nullable: false })
  streamId!: number;
}
