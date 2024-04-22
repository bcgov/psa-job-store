import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileJobFamilySumAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;
}
