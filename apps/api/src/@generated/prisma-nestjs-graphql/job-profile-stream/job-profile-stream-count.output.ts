import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class JobProfileStreamCount {
  @Field(() => Int, { nullable: false })
  job_profiles?: number;
}
