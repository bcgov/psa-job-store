import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ScheduledTaskMetadataUpdateManyMutationInput } from './scheduled-task-metadata-update-many-mutation.input';
import { Type } from 'class-transformer';
import { ScheduledTaskMetadataWhereInput } from './scheduled-task-metadata-where.input';

@ArgsType()
export class UpdateManyScheduledTaskMetadataArgs {
  @Field(() => ScheduledTaskMetadataUpdateManyMutationInput, { nullable: false })
  @Type(() => ScheduledTaskMetadataUpdateManyMutationInput)
  data!: ScheduledTaskMetadataUpdateManyMutationInput;

  @Field(() => ScheduledTaskMetadataWhereInput, { nullable: true })
  @Type(() => ScheduledTaskMetadataWhereInput)
  where?: ScheduledTaskMetadataWhereInput;
}
