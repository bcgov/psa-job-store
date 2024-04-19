import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileRoleTypeAvgAggregate {
  @Field(() => Float, { nullable: true })
  id?: number;
}
