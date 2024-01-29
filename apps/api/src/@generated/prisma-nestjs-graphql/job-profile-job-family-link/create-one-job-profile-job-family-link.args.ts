import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileJobFamilyLinkCreateInput } from './job-profile-job-family-link-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneJobProfileJobFamilyLinkArgs {
  @Field(() => JobProfileJobFamilyLinkCreateInput, { nullable: false })
  @Type(() => JobProfileJobFamilyLinkCreateInput)
  data!: JobProfileJobFamilyLinkCreateInput;
}
