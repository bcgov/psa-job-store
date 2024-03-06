import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ScheduledTaskMetadataWhereInput } from './scheduled-task-metadata-where.input';
import { Type } from 'class-transformer';
import { ScheduledTaskMetadataOrderByWithRelationAndSearchRelevanceInput } from './scheduled-task-metadata-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { ScheduledTaskMetadataWhereUniqueInput } from './scheduled-task-metadata-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ScheduledTaskMetadataScalarFieldEnum } from './scheduled-task-metadata-scalar-field.enum';

@ArgsType()
export class FindFirstScheduledTaskMetadataOrThrowArgs {
  @Field(() => ScheduledTaskMetadataWhereInput, { nullable: true })
  @Type(() => ScheduledTaskMetadataWhereInput)
  where?: ScheduledTaskMetadataWhereInput;

  @Field(() => [ScheduledTaskMetadataOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<ScheduledTaskMetadataOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => ScheduledTaskMetadataWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<ScheduledTaskMetadataWhereUniqueInput, 'task'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [ScheduledTaskMetadataScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof ScheduledTaskMetadataScalarFieldEnum>;
}
