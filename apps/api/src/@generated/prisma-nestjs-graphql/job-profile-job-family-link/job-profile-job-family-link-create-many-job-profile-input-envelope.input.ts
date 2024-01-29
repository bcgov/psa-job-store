import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyLinkCreateManyJobProfileInput } from './job-profile-job-family-link-create-many-job-profile.input';
import { Type } from 'class-transformer';

@InputType()
export class JobProfileJobFamilyLinkCreateManyJobProfileInputEnvelope {
  @Field(() => [JobProfileJobFamilyLinkCreateManyJobProfileInput], { nullable: false })
  @Type(() => JobProfileJobFamilyLinkCreateManyJobProfileInput)
  data!: Array<JobProfileJobFamilyLinkCreateManyJobProfileInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
