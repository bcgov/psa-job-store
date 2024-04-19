import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileRoleSumAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;
}
