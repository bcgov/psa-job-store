import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class OrganizationCount {
  @Field(() => Int, { nullable: false })
  departments?: number;

  @Field(() => Int, { nullable: false })
  positions?: number;

  @Field(() => Int, { nullable: false })
  employees?: number;

  @Field(() => Int, { nullable: false })
  job_proviles?: number;
}
