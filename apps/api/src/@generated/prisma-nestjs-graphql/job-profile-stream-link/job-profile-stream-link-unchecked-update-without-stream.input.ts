import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class JobProfileStreamLinkUncheckedUpdateWithoutStreamInput {
  @Field(() => Int, { nullable: true })
  jobProfileId?: number;
}
