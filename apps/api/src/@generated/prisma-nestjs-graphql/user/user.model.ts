import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
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

  @Field(() => [String], { nullable: true })
  roles!: Array<string>;

  @Field(() => Date, { nullable: false })
  created_at!: Date;

  @Field(() => Date, { nullable: false })
  updated_at!: Date;

  @Field(() => Date, { nullable: true })
  deleted_at!: Date | null;

  @Field(() => [Comment], { nullable: true })
  comments?: Array<Comment>;

  @Field(() => [JobProfile], { nullable: true })
  job_profiles?: Array<JobProfile>;
}
