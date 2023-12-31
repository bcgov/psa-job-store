import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class UserCount {
  @Field(() => Int, { nullable: false })
  comments?: number;

  @Field(() => Int, { nullable: false })
  identities?: number;

  @Field(() => Int, { nullable: false })
  job_profiles?: number;
}
