import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileStreamLinkUncheckedCreateWithoutStreamInput {
  @Field(() => Int, { nullable: false })
  jobProfileId!: number;
}
