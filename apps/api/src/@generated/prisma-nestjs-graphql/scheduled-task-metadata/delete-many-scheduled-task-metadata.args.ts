import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ScheduledTaskMetadataWhereInput } from './scheduled-task-metadata-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyScheduledTaskMetadataArgs {
  @Field(() => ScheduledTaskMetadataWhereInput, { nullable: true })
  @Type(() => ScheduledTaskMetadataWhereInput)
  where?: ScheduledTaskMetadataWhereInput;
}
