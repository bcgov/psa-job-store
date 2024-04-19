import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutClassificationsInput } from './job-profile-update-without-classifications.input';
import { JobProfileWhereInput } from './job-profile-where.input';

@InputType()
export class JobProfileUpdateToOneWithWhereWithoutClassificationsInput {
  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  where?: JobProfileWhereInput;

  @Field(() => JobProfileUpdateWithoutClassificationsInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutClassificationsInput)
  data!: JobProfileUpdateWithoutClassificationsInput;
}
