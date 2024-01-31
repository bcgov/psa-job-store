import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class JobProfileStreamLinkUncheckedUpdateManyWithoutJobProfileInput {
  @Field(() => Int, { nullable: true })
  streamId?: number;
}
