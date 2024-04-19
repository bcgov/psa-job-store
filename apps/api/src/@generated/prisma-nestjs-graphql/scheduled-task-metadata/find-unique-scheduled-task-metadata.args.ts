import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { ScheduledTaskMetadataWhereUniqueInput } from './scheduled-task-metadata-where-unique.input';

@ArgsType()
export class FindUniqueScheduledTaskMetadataArgs {
  @Field(() => ScheduledTaskMetadataWhereUniqueInput, { nullable: false })
  @Type(() => ScheduledTaskMetadataWhereUniqueInput)
  where!: Prisma.AtLeast<ScheduledTaskMetadataWhereUniqueInput, 'task'>;
}
