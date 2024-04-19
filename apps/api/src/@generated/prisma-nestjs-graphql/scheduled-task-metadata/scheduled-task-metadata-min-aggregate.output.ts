import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ScheduledTaskMetadataMinAggregate {
  @Field(() => String, { nullable: true })
  task?: string;

  @Field(() => Int, { nullable: true })
  frequency?: number;

  @Field(() => Date, { nullable: true })
  last_run_at?: Date | string;
}
