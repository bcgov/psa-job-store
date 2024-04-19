import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileStreamLinkCreateManyJobProfileInput {
  @Field(() => Int, { nullable: false })
  streamId!: number;
}
