import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ScheduledTaskMetadataCreateInput } from './scheduled-task-metadata-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneScheduledTaskMetadataArgs {
  @Field(() => ScheduledTaskMetadataCreateInput, { nullable: false })
  @Type(() => ScheduledTaskMetadataCreateInput)
  data!: ScheduledTaskMetadataCreateInput;
}
