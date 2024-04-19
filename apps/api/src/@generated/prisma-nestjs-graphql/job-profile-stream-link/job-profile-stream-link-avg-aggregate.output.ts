import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileStreamLinkAvgAggregate {
  @Field(() => Float, { nullable: true })
  jobProfileId?: number;

  @Field(() => Float, { nullable: true })
  streamId?: number;
}
