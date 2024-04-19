import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { ScheduledTaskMetadataUpdateInput } from './scheduled-task-metadata-update.input';
import { ScheduledTaskMetadataWhereUniqueInput } from './scheduled-task-metadata-where-unique.input';

@ArgsType()
export class UpdateOneScheduledTaskMetadataArgs {
  @Field(() => ScheduledTaskMetadataUpdateInput, { nullable: false })
  @Type(() => ScheduledTaskMetadataUpdateInput)
  data!: ScheduledTaskMetadataUpdateInput;

  @Field(() => ScheduledTaskMetadataWhereUniqueInput, { nullable: false })
  @Type(() => ScheduledTaskMetadataWhereUniqueInput)
  where!: Prisma.AtLeast<ScheduledTaskMetadataWhereUniqueInput, 'task'>;
}
