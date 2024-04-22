import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileJobFamilyMinAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  name?: true;
}
