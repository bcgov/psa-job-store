import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class JobProfileJobFamilyLinkAvgAggregate {
  @Field(() => Float, { nullable: true })
  jobProfileId?: number;

  @Field(() => Float, { nullable: true })
  jobFamilyId?: number;
}
