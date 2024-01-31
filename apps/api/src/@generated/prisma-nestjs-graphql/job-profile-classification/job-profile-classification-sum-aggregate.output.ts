import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class JobProfileClassificationSumAggregate {
  @Field(() => Int, { nullable: true })
  job_profile_id?: number;
}
