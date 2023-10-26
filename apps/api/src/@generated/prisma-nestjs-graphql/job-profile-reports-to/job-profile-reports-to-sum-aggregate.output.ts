import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class JobProfileReportsToSumAggregate {
  @Field(() => Int, { nullable: true })
  classification_id?: number;

  @Field(() => Int, { nullable: true })
  job_profile_id?: number;
}
