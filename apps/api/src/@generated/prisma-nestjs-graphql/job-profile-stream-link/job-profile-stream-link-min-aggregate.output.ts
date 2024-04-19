import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileStreamLinkMinAggregate {
  @Field(() => Int, { nullable: true })
  jobProfileId?: number;

  @Field(() => Int, { nullable: true })
  streamId?: number;
}
