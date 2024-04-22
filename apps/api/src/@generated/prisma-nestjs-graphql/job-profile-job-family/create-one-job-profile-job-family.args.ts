import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyCreateInput } from './job-profile-job-family-create.input';

@ArgsType()
export class CreateOneJobProfileJobFamilyArgs {
  @Field(() => JobProfileJobFamilyCreateInput, { nullable: false })
  @Type(() => JobProfileJobFamilyCreateInput)
  data!: JobProfileJobFamilyCreateInput;
}
