import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class OccupationGroupCount {
  @Field(() => Int, { nullable: false })
  classifications?: number;
}
