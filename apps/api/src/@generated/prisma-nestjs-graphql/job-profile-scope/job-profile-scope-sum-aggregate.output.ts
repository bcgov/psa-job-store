import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileScopeSumAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;
}
