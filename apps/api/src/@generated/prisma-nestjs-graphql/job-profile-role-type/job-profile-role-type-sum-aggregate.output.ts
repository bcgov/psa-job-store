import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileRoleTypeSumAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;
}
