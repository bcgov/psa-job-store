import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class JobProfileStreamLinkUncheckedCreateWithoutJobProfileInput {
  @Field(() => Int, { nullable: false })
  streamId!: number;
}
