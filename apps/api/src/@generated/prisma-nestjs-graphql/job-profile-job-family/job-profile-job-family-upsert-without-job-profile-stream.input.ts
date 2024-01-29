import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyUpdateWithoutJobProfileStreamInput } from './job-profile-job-family-update-without-job-profile-stream.input';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyCreateWithoutJobProfileStreamInput } from './job-profile-job-family-create-without-job-profile-stream.input';
import { JobProfileJobFamilyWhereInput } from './job-profile-job-family-where.input';

@InputType()
export class JobProfileJobFamilyUpsertWithoutJobProfileStreamInput {
  @Field(() => JobProfileJobFamilyUpdateWithoutJobProfileStreamInput, { nullable: false })
  @Type(() => JobProfileJobFamilyUpdateWithoutJobProfileStreamInput)
  update!: JobProfileJobFamilyUpdateWithoutJobProfileStreamInput;

  @Field(() => JobProfileJobFamilyCreateWithoutJobProfileStreamInput, { nullable: false })
  @Type(() => JobProfileJobFamilyCreateWithoutJobProfileStreamInput)
  create!: JobProfileJobFamilyCreateWithoutJobProfileStreamInput;

  @Field(() => JobProfileJobFamilyWhereInput, { nullable: true })
  @Type(() => JobProfileJobFamilyWhereInput)
  where?: JobProfileJobFamilyWhereInput;
}
