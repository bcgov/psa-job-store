import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileStreamLinkCountAggregate {
  @Field(() => Int, { nullable: false })
  jobProfileId!: number;

  @Field(() => Int, { nullable: false })
  streamId!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
