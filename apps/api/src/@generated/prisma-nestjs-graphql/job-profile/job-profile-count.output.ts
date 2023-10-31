import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class JobProfileCount {
  @Field(() => Int, { nullable: false })
  behavioural_competencies?: number;

  @Field(() => Int, { nullable: false })
  reports_to?: number;

  @Field(() => Int, { nullable: false })
  children?: number;
}
