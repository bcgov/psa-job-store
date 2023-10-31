import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class CareerGroupCount {
  @Field(() => Int, { nullable: false })
  profiles?: number;
}
