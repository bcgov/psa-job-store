import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ScheduledTaskMetadataWhereUniqueInput } from './scheduled-task-metadata-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteOneScheduledTaskMetadataArgs {
  @Field(() => ScheduledTaskMetadataWhereUniqueInput, { nullable: false })
  @Type(() => ScheduledTaskMetadataWhereUniqueInput)
  where!: Prisma.AtLeast<ScheduledTaskMetadataWhereUniqueInput, 'task'>;
}
