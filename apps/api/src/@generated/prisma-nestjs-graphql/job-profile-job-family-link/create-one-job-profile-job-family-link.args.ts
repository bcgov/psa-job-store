import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyLinkCreateInput } from './job-profile-job-family-link-create.input';

@ArgsType()
export class CreateOneJobProfileJobFamilyLinkArgs {
  @Field(() => JobProfileJobFamilyLinkCreateInput, { nullable: false })
  @Type(() => JobProfileJobFamilyLinkCreateInput)
  data!: JobProfileJobFamilyLinkCreateInput;
}
