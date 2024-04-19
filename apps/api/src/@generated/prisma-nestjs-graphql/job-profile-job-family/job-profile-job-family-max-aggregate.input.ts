import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileJobFamilyMaxAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  name?: true;
}
