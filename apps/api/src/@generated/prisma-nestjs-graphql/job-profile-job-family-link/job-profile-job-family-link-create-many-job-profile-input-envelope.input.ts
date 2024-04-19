import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyLinkCreateManyJobProfileInput } from './job-profile-job-family-link-create-many-job-profile.input';

@InputType()
export class JobProfileJobFamilyLinkCreateManyJobProfileInputEnvelope {
  @Field(() => [JobProfileJobFamilyLinkCreateManyJobProfileInput], { nullable: false })
  @Type(() => JobProfileJobFamilyLinkCreateManyJobProfileInput)
  data!: Array<JobProfileJobFamilyLinkCreateManyJobProfileInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
