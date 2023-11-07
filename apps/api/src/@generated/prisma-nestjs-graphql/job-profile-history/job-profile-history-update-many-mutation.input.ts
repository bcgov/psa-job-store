import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class JobProfileHistoryUpdateManyMutationInput {
  @Field(() => Int, { nullable: true })
  job_profile_id?: number;

  @Field(() => GraphQLJSON, { nullable: true })
  json?: any;

  @Field(() => Date, { nullable: true })
  created_at?: Date | string;

  @Field(() => Int, { nullable: true })
  created_by?: number;

  @Field(() => Date, { nullable: true })
  updated_at?: Date | string;

  @Field(() => Int, { nullable: true })
  updated_by?: number;

  @Field(() => Date, { nullable: true })
  deleted_at?: Date | string;

  @Field(() => Int, { nullable: true })
  deleted_by?: number;
}
