import { registerEnumType } from '@nestjs/graphql';

export enum ScheduledTaskMetadataScalarFieldEnum {
  task = 'task',
  frequency = 'frequency',
  last_run_at = 'last_run_at',
}

registerEnumType(ScheduledTaskMetadataScalarFieldEnum, {
  name: 'ScheduledTaskMetadataScalarFieldEnum',
  description: undefined,
});
