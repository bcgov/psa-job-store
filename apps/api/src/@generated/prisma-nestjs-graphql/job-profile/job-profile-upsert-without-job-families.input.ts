import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileUpdateWithoutJobFamiliesInput } from './job-profile-update-without-job-families.input';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutJobFamiliesInput } from './job-profile-create-without-job-families.input';
import { JobProfileWhereInput } from './job-profile-where.input';

@InputType()
export class JobProfileUpsertWithoutJobFamiliesInput {
  @Field(() => JobProfileUpdateWithoutJobFamiliesInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutJobFamiliesInput)
  update!: JobProfileUpdateWithoutJobFamiliesInput;

  @Field(() => JobProfileCreateWithoutJobFamiliesInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutJobFamiliesInput)
  create!: JobProfileCreateWithoutJobFamiliesInput;

  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  where?: JobProfileWhereInput;
}
