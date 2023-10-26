import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class JobProfileHistoryCreateManyInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: false })
  job_profile_id!: number;

  @Field(() => GraphQLJSON, { nullable: false })
  json!: any;

  @Field(() => Date, { nullable: true })
  created_at?: Date | string;

  @Field(() => Int, { nullable: false })
  created_by!: number;

  @Field(() => Date, { nullable: true })
  updated_at?: Date | string;

  @Field(() => Int, { nullable: false })
  updated_by!: number;

  @Field(() => Date, { nullable: true })
  deleted_at?: Date | string;

  @Field(() => Int, { nullable: false })
  deleted_by!: number;
}
