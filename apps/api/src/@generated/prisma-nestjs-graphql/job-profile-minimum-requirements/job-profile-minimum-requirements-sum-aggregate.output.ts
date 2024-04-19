import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileMinimumRequirementsSumAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;
}
