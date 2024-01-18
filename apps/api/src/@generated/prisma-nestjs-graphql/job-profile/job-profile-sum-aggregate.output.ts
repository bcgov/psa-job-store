import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class JobProfileSumAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  career_group_id?: number;

  @Field(() => Int, { nullable: true })
  job_family_id?: number;

  @Field(() => Int, { nullable: true })
  role_id?: number;

  @Field(() => Int, { nullable: true })
  scope_id?: number;

  @Field(() => Int, { nullable: true })
  stream_id?: number;

  @Field(() => Int, { nullable: true })
  number?: number;
}
