import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileRoleAvgAggregate {
  @Field(() => Float, { nullable: true })
  id?: number;
}
