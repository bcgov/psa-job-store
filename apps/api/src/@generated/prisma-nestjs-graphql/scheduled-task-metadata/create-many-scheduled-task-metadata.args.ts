import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ScheduledTaskMetadataCreateManyInput } from './scheduled-task-metadata-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyScheduledTaskMetadataArgs {
  @Field(() => [ScheduledTaskMetadataCreateManyInput], { nullable: false })
  @Type(() => ScheduledTaskMetadataCreateManyInput)
  data!: Array<ScheduledTaskMetadataCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
