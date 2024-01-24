import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileWhereInput } from './job-profile-where.input';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutJobFamiliesInput } from './job-profile-update-without-job-families.input';

@InputType()
export class JobProfileUpdateToOneWithWhereWithoutJobFamiliesInput {
  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  where?: JobProfileWhereInput;

  @Field(() => JobProfileUpdateWithoutJobFamiliesInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutJobFamiliesInput)
  data!: JobProfileUpdateWithoutJobFamiliesInput;
}
