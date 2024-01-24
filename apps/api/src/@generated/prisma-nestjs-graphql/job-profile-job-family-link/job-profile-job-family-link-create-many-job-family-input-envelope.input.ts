import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyLinkCreateManyJobFamilyInput } from './job-profile-job-family-link-create-many-job-family.input';
import { Type } from 'class-transformer';

@InputType()
export class JobProfileJobFamilyLinkCreateManyJobFamilyInputEnvelope {
  @Field(() => [JobProfileJobFamilyLinkCreateManyJobFamilyInput], { nullable: false })
  @Type(() => JobProfileJobFamilyLinkCreateManyJobFamilyInput)
  data!: Array<JobProfileJobFamilyLinkCreateManyJobFamilyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
