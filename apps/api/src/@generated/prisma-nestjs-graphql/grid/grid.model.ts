import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Classification } from '../classification/classification.model';

@ObjectType()
export class Grid {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => [Classification], { nullable: true })
  classifications?: Array<Classification>;
}
