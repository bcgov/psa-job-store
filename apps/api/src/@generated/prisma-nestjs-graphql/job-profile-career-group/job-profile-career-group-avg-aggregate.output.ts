import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class JobProfileCareerGroupAvgAggregate {
  @Field(() => Float, { nullable: true })
  id?: number;
}
