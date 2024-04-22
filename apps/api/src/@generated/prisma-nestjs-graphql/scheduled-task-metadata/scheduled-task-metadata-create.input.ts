import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ScheduledTaskMetadataCreateInput {
  @Field(() => String, { nullable: false })
  task!: string;

  @Field(() => Int, { nullable: true })
  frequency?: number;

  @Field(() => Date, { nullable: true })
  last_run_at?: Date | string;
}
