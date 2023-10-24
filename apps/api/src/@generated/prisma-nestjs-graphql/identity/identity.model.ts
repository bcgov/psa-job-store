import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { User } from '../user/user.model';

@ObjectType()
export class Identity {
  @Field(() => String, { nullable: false })
  sub!: string;

  @Field(() => String, { nullable: false })
  identity_provider!: string;

  @Field(() => String, { nullable: false })
  user_id!: string;

  @Field(() => Date, { nullable: false })
  created_at!: Date;

  @Field(() => Date, { nullable: false })
  updated_at!: Date;

  @Field(() => Date, { nullable: true })
  deleted_at!: Date | null;

  @Field(() => User, { nullable: false })
  user?: User;
}
