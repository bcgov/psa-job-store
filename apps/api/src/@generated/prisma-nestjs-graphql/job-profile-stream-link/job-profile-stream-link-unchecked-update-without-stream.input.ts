import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileStreamLinkUncheckedUpdateWithoutStreamInput {
  @Field(() => Int, { nullable: true })
  jobProfileId?: number;
}
