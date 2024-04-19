import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileJobFamilySumAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;
}
