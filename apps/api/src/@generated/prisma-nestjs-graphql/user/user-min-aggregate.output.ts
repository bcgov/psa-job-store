import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserMinAggregate {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => Date, { nullable: true })
  created_at?: Date | string;

  @Field(() => Date, { nullable: true })
  updated_at?: Date | string;

  @Field(() => Date, { nullable: true })
  deleted_at?: Date | string;
}
