import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileJobFamilyAvgAggregate {
  @Field(() => Float, { nullable: true })
  id?: number;
}
