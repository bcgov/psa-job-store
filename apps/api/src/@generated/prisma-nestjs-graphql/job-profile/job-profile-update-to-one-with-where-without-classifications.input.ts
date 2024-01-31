import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileWhereInput } from './job-profile-where.input';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutClassificationsInput } from './job-profile-update-without-classifications.input';

@InputType()
export class JobProfileUpdateToOneWithWhereWithoutClassificationsInput {
  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  where?: JobProfileWhereInput;

  @Field(() => JobProfileUpdateWithoutClassificationsInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutClassificationsInput)
  data!: JobProfileUpdateWithoutClassificationsInput;
}
