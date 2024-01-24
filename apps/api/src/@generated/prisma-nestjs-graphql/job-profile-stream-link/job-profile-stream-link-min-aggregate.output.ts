import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class JobProfileStreamLinkMinAggregate {
  @Field(() => Int, { nullable: true })
  jobProfileId?: number;

  @Field(() => Int, { nullable: true })
  streamId?: number;
}
