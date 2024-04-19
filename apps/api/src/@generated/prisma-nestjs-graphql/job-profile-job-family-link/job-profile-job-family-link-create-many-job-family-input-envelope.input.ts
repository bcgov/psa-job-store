import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyLinkCreateManyJobFamilyInput } from './job-profile-job-family-link-create-many-job-family.input';

@InputType()
export class JobProfileJobFamilyLinkCreateManyJobFamilyInputEnvelope {
  @Field(() => [JobProfileJobFamilyLinkCreateManyJobFamilyInput], { nullable: false })
  @Type(() => JobProfileJobFamilyLinkCreateManyJobFamilyInput)
  data!: Array<JobProfileJobFamilyLinkCreateManyJobFamilyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
