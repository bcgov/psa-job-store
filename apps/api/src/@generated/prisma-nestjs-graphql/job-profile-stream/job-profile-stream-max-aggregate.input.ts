import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileStreamMaxAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  job_family_id?: true;

  @Field(() => Boolean, { nullable: true })
  name?: true;
}
