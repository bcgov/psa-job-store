import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class JobCategoryCount {
  @Field(() => Int, { nullable: false })
  profiles?: number;
}
