import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileStreamLinkCreateManyStreamInput {
  @Field(() => Int, { nullable: false })
  jobProfileId!: number;
}
