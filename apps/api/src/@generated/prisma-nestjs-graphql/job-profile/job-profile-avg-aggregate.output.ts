import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class JobProfileAvgAggregate {
  @Field(() => Float, { nullable: true })
  id?: number;

  @Field(() => Float, { nullable: true })
  career_group_id?: number;

  @Field(() => Float, { nullable: true })
  classification_id?: number;

  @Field(() => Float, { nullable: true })
  family_id?: number;

  @Field(() => Float, { nullable: true })
  ministry_id?: number;

  @Field(() => Float, { nullable: true })
  parent_id?: number;

  @Field(() => Float, { nullable: true })
  role_id?: number;

  @Field(() => Float, { nullable: true })
  number?: number;
}
