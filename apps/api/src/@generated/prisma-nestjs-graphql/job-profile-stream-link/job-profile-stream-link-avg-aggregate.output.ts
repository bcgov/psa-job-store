import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class JobProfileStreamLinkAvgAggregate {
  @Field(() => Float, { nullable: true })
  jobProfileId?: number;

  @Field(() => Float, { nullable: true })
  streamId?: number;
}
