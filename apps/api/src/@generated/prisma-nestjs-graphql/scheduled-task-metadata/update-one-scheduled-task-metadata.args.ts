import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ScheduledTaskMetadataUpdateInput } from './scheduled-task-metadata-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
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
