import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class JobProfileAvgAggregate {
  @Field(() => Float, { nullable: true })
  id?: number;

  @Field(() => Float, { nullable: true })
  career_group_id?: number;

  @Field(() => Float, { nullable: true })
  job_family_id?: number;

  @Field(() => Float, { nullable: true })
  role_id?: number;

  @Field(() => Float, { nullable: true })
  role_type_id?: number;

  @Field(() => Float, { nullable: true })
  scope_id?: number;

  @Field(() => Float, { nullable: true })
  stream_id?: number;

  @Field(() => Float, { nullable: true })
  number?: number;
}
