import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileReportsToCreateManyJob_profileInput } from './job-profile-reports-to-create-many-job-profile.input';
import { Type } from 'class-transformer';

@InputType()
export class JobProfileReportsToCreateManyJob_profileInputEnvelope {
  @Field(() => [JobProfileReportsToCreateManyJob_profileInput], { nullable: false })
  @Type(() => JobProfileReportsToCreateManyJob_profileInput)
  data!: Array<JobProfileReportsToCreateManyJob_profileInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
