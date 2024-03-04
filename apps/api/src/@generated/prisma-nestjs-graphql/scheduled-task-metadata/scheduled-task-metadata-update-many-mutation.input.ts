import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class ScheduledTaskMetadataUpdateManyMutationInput {
  @Field(() => String, { nullable: true })
  task?: string;

  @Field(() => Int, { nullable: true })
  frequency?: number;

  @Field(() => Date, { nullable: true })
  last_run_at?: Date | string;
}
