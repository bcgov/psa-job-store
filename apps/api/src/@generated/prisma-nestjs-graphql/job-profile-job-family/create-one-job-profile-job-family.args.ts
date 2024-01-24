import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileJobFamilyCreateInput } from './job-profile-job-family-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneJobProfileJobFamilyArgs {
  @Field(() => JobProfileJobFamilyCreateInput, { nullable: false })
  @Type(() => JobProfileJobFamilyCreateInput)
  data!: JobProfileJobFamilyCreateInput;
}
