import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class JobProfileOrganizationAvgAggregate {
  @Field(() => Float, { nullable: true })
  job_profile_id?: number;
}
