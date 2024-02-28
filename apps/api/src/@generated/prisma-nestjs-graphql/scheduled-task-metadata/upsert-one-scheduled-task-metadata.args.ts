import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ScheduledTaskMetadataWhereUniqueInput } from './scheduled-task-metadata-where-unique.input';
import { Type } from 'class-transformer';
import { ScheduledTaskMetadataCreateInput } from './scheduled-task-metadata-create.input';
import { ScheduledTaskMetadataUpdateInput } from './scheduled-task-metadata-update.input';

@ArgsType()
export class UpsertOneScheduledTaskMetadataArgs {
  @Field(() => ScheduledTaskMetadataWhereUniqueInput, { nullable: false })
  @Type(() => ScheduledTaskMetadataWhereUniqueInput)
  where!: Prisma.AtLeast<ScheduledTaskMetadataWhereUniqueInput, 'task'>;

  @Field(() => ScheduledTaskMetadataCreateInput, { nullable: false })
  @Type(() => ScheduledTaskMetadataCreateInput)
  create!: ScheduledTaskMetadataCreateInput;

  @Field(() => ScheduledTaskMetadataUpdateInput, { nullable: false })
  @Type(() => ScheduledTaskMetadataUpdateInput)
  update!: ScheduledTaskMetadataUpdateInput;
}
