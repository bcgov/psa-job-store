import { registerEnumType } from '@nestjs/graphql';

export enum ScheduledTaskMetadataOrderByRelevanceFieldEnum {
  task = 'task',
}

registerEnumType(ScheduledTaskMetadataOrderByRelevanceFieldEnum, {
  name: 'ScheduledTaskMetadataOrderByRelevanceFieldEnum',
  description: undefined,
});
