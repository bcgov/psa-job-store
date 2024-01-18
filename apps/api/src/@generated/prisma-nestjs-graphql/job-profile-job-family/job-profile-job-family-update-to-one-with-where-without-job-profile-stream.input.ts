import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyWhereInput } from './job-profile-job-family-where.input';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyUpdateWithoutJobProfileStreamInput } from './job-profile-job-family-update-without-job-profile-stream.input';

@InputType()
export class JobProfileJobFamilyUpdateToOneWithWhereWithoutJobProfileStreamInput {
  @Field(() => JobProfileJobFamilyWhereInput, { nullable: true })
  @Type(() => JobProfileJobFamilyWhereInput)
  where?: JobProfileJobFamilyWhereInput;

  @Field(() => JobProfileJobFamilyUpdateWithoutJobProfileStreamInput, { nullable: false })
  @Type(() => JobProfileJobFamilyUpdateWithoutJobProfileStreamInput)
  data!: JobProfileJobFamilyUpdateWithoutJobProfileStreamInput;
}
