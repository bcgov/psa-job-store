import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileMinimumRequirementsAvgAggregate {
  @Field(() => Float, { nullable: true })
  id?: number;
}
