import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ScheduledTaskMetadataMaxAggregateInput {
  @Field(() => Boolean, { nullable: true })
  task?: true;

  @Field(() => Boolean, { nullable: true })
  frequency?: true;

  @Field(() => Boolean, { nullable: true })
  last_run_at?: true;
}
