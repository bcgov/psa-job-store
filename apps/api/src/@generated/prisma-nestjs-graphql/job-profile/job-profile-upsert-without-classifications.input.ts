import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutClassificationsInput } from './job-profile-create-without-classifications.input';
import { JobProfileUpdateWithoutClassificationsInput } from './job-profile-update-without-classifications.input';
import { JobProfileWhereInput } from './job-profile-where.input';

@InputType()
export class JobProfileUpsertWithoutClassificationsInput {
  @Field(() => JobProfileUpdateWithoutClassificationsInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutClassificationsInput)
  update!: JobProfileUpdateWithoutClassificationsInput;

  @Field(() => JobProfileCreateWithoutClassificationsInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutClassificationsInput)
  create!: JobProfileCreateWithoutClassificationsInput;

  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  where?: JobProfileWhereInput;
}
