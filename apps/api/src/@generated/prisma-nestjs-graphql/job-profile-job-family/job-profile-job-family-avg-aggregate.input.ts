import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileJobFamilyAvgAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;
}
