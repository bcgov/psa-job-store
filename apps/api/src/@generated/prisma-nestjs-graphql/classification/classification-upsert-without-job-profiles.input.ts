import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationUpdateWithoutJob_profilesInput } from './classification-update-without-job-profiles.input';
import { Type } from 'class-transformer';
import { ClassificationCreateWithoutJob_profilesInput } from './classification-create-without-job-profiles.input';
import { ClassificationWhereInput } from './classification-where.input';

@InputType()
export class ClassificationUpsertWithoutJob_profilesInput {
  @Field(() => ClassificationUpdateWithoutJob_profilesInput, { nullable: false })
  @Type(() => ClassificationUpdateWithoutJob_profilesInput)
  update!: ClassificationUpdateWithoutJob_profilesInput;

  @Field(() => ClassificationCreateWithoutJob_profilesInput, { nullable: false })
  @Type(() => ClassificationCreateWithoutJob_profilesInput)
  create!: ClassificationCreateWithoutJob_profilesInput;

  @Field(() => ClassificationWhereInput, { nullable: true })
  @Type(() => ClassificationWhereInput)
  where?: ClassificationWhereInput;
}
