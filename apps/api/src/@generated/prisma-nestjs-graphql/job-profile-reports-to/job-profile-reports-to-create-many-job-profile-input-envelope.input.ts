import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileReportsToCreateManyJob_profileInput } from './job-profile-reports-to-create-many-job-profile.input';

@InputType()
export class JobProfileReportsToCreateManyJob_profileInputEnvelope {
  @Field(() => [JobProfileReportsToCreateManyJob_profileInput], { nullable: false })
  @Type(() => JobProfileReportsToCreateManyJob_profileInput)
  data!: Array<JobProfileReportsToCreateManyJob_profileInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
