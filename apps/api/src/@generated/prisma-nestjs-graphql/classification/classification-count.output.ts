import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class ClassificationCount {
  @Field(() => Int, { nullable: false })
  job_profiles?: number;

  @Field(() => Int, { nullable: false })
  dependent_job_profiles?: number;
}
