import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ScheduledTaskMetadataCountAggregateInput {
  @Field(() => Boolean, { nullable: true })
  task?: true;

  @Field(() => Boolean, { nullable: true })
  frequency?: true;

  @Field(() => Boolean, { nullable: true })
  last_run_at?: true;

  @Field(() => Boolean, { nullable: true })
  _all?: true;
}
