import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ScheduledTaskMetadataWhereInput } from './scheduled-task-metadata-where.input';

@ArgsType()
export class DeleteManyScheduledTaskMetadataArgs {
  @Field(() => ScheduledTaskMetadataWhereInput, { nullable: true })
  @Type(() => ScheduledTaskMetadataWhereInput)
  where?: ScheduledTaskMetadataWhereInput;
}
