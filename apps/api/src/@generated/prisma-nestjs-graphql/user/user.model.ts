import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { Comment } from '../comment/comment.model';
import { JobProfile } from '../job-profile/job-profile.model';

@ObjectType()
export class User {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: true })
  name!: string | null;

  @Field(() => String, { nullable: true })
  email!: string | null;

  @Field(() => String, { nullable: true })
  username!: string | null;

  @Field(() => [String], { nullable: true })
  roles!: Array<string>;

  @Field(() => GraphQLJSON, { nullable: true })
  metadata!: any | null;

  @Field(() => Date, { nullable: false })
  created_at!: Date;

  @Field(() => Date, { nullable: false })
  updated_at!: Date;

  @Field(() => Date, { nullable: true })
  deleted_at!: Date | null;

  @Field(() => [Comment], { nullable: true })
  comments?: Array<Comment>;

  @Field(() => [JobProfile], { nullable: true })
  JobProfile?: Array<JobProfile>;
}
