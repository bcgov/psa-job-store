import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutJobFamiliesInput } from './job-profile-update-without-job-families.input';
import { JobProfileWhereInput } from './job-profile-where.input';

@InputType()
export class JobProfileUpdateToOneWithWhereWithoutJobFamiliesInput {
  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  where?: JobProfileWhereInput;

  @Field(() => JobProfileUpdateWithoutJobFamiliesInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutJobFamiliesInput)
  data!: JobProfileUpdateWithoutJobFamiliesInput;
}
