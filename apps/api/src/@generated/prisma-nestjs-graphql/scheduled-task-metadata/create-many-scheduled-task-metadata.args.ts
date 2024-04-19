import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ScheduledTaskMetadataCreateManyInput } from './scheduled-task-metadata-create-many.input';

@ArgsType()
export class CreateManyScheduledTaskMetadataArgs {
  @Field(() => [ScheduledTaskMetadataCreateManyInput], { nullable: false })
  @Type(() => ScheduledTaskMetadataCreateManyInput)
  data!: Array<ScheduledTaskMetadataCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
