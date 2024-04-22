import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ScheduledTaskMetadata {
  @Field(() => String, { nullable: false })
  task!: string;

  @Field(() => Int, { nullable: true })
  frequency!: number | null;

  @Field(() => Date, { nullable: true })
  last_run_at!: Date | null;
}
