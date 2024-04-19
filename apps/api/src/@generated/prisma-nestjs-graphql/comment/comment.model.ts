import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../user/user.model';

@ObjectType()
export class Comment {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  author_id!: string;

  @Field(() => Int, { nullable: false })
  record_id!: number;

  @Field(() => String, { nullable: false })
  record_type!: string;

  @Field(() => String, { nullable: false })
  text!: string;

  @Field(() => Date, { nullable: false })
  created_at!: Date;

  @Field(() => Date, { nullable: false })
  updated_at!: Date;

  @Field(() => Date, { nullable: true })
  deleted_at!: Date | null;

  @Field(() => User, { nullable: false })
  author?: User;
}
