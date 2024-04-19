import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ScheduledTaskMetadataCreateInput } from './scheduled-task-metadata-create.input';

@ArgsType()
export class CreateOneScheduledTaskMetadataArgs {
  @Field(() => ScheduledTaskMetadataCreateInput, { nullable: false })
  @Type(() => ScheduledTaskMetadataCreateInput)
  data!: ScheduledTaskMetadataCreateInput;
}
