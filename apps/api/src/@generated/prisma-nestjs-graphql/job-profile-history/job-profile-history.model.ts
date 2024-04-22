import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class JobProfileHistory {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  job_profile_id!: number;

  @Field(() => GraphQLJSON, { nullable: false })
  json!: any;

  @Field(() => Date, { nullable: false })
  created_at!: Date;

  @Field(() => Int, { nullable: false })
  created_by!: number;

  @Field(() => Date, { nullable: false })
  updated_at!: Date;

  @Field(() => Int, { nullable: false })
  updated_by!: number;

  @Field(() => Date, { nullable: true })
  deleted_at!: Date | null;

  @Field(() => Int, { nullable: false })
  deleted_by!: number;
}
