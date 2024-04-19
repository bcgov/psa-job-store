import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileScopeAvgAggregate {
  @Field(() => Float, { nullable: true })
  id?: number;
}
