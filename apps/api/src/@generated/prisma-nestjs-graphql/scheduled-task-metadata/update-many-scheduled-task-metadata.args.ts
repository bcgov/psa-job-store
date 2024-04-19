import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ScheduledTaskMetadataUpdateManyMutationInput } from './scheduled-task-metadata-update-many-mutation.input';
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
