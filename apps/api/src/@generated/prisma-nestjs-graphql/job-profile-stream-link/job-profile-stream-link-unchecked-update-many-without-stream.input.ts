import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileStreamLinkUncheckedUpdateManyWithoutStreamInput {
  @Field(() => Int, { nullable: true })
  jobProfileId?: number;
}
